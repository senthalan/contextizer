package com.senthalan.contextizer.service;


import com.senthalan.contextizer.domain.Media;
import com.senthalan.contextizer.domain.Tag;
import com.senthalan.contextizer.domain.User;
import com.senthalan.contextizer.message.*;
import com.senthalan.contextizer.repo.MediaRepository;
import com.senthalan.contextizer.repo.TagRepository;
import com.senthalan.contextizer.repo.UserRepository;
import com.senthalan.contextizer.util.MD5;
import com.senthalan.contextizer.util.MNException;
import com.senthalan.contextizer.util.MailGunSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class MediaService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MediaService.class);

    @Autowired
    AuthService authService;

    @Autowired
    MediaRepository mediaRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TagRepository TagRepository;

    public Media registerMedia(Media media) throws MNException {
        LOGGER.debug("Media Register request received with params : {}", media);

        if (!media.validateRegister()) {
            throw new MNException(MNStatus.MISSING_REQUIRED_PARAMS);
        }
        if (mediaRepository.findOneByContactPersonEmail(media.contactPersonEmail) != null) {
            throw new MNException(MNStatus.MEDIA_NAME_NOT_AVAILABLE);
        }


        media.password = MD5.getMD5(media.password);
        media.status = Media.MediaStatus.INITIAL;
        Media savedMedia = mediaRepository.save(media);

        if (savedMedia == null) {
            throw new MNException(MNStatus.ERROR);
        }

        LOGGER.debug("Media registration success  ", media);
        //24 hours non-expire token
        String accessToken = authService.createJWT(savedMedia.id, media.contactPersonEmail, 1440);
        try {
            MailGunSender.SendSimpleMessage("senthalan18@gmail.com",
                    "MyNews Media Registered",
                    "Media Details: " + media.name
                            + "\n\nAccess Token: " + accessToken
                            + "\n\n\nPlease not that Access Token expired in 24 hours");
        } catch (Exception e) {
            LOGGER.error("Error while sending MailGun email", e);
        }
        return media;
    }

    public SignInMediaResp SignIn(Media media) throws MNException {
        LOGGER.debug("Media SignIn request received with params : {}", media);

        SignInMediaResp signInMediaResp;

        if (!media.validateSignIn()) {
            throw new MNException(MNStatus.MISSING_REQUIRED_PARAMS);
        }
        Media savedMedia = mediaRepository.findOneByContactPersonEmail(media.contactPersonEmail);
        if (savedMedia == null) {
            throw new MNException(MNStatus.NO_SUCH_MEDIA);
        }
        if (!savedMedia.password.equals(MD5.getMD5(media.password))) {
            throw new MNException(MNStatus.WRONG_CREDENTIALS);
        }
        if (savedMedia.status != Media.MediaStatus.INITIAL) {
            //24 hours non-expire token
            String accessToken = authService.createJWT(savedMedia.id, media.contactPersonEmail, 1440);
            signInMediaResp = new SignInMediaResp(accessToken, savedMedia.maskPassword());

            LOGGER.debug("Media SignIn response with success mediaId : {}", signInMediaResp.media.id);
            return signInMediaResp;
        } else {
            throw new MNException(MNStatus.MEDIA_NOT_APPROVED);
        }

    }


    public SignInMediaResp refresh(Media media) throws MNException {
        LOGGER.debug("Media refresh request received with params : {}", media);

        SignInMediaResp signInMediaResp;

        Media savedMedia = mediaRepository.findOneByContactPersonEmail(media.contactPersonEmail);
        if (savedMedia == null) {
            throw new MNException(MNStatus.NO_SUCH_MEDIA);
        }
        savedMedia.status =Media.MediaStatus.APPROVED;
        mediaRepository.save(savedMedia);

        //24 hours non-expire token
        String accessToken = authService.createJWT(savedMedia.id, media.contactPersonEmail, 1440);
        signInMediaResp = new SignInMediaResp(accessToken, savedMedia.maskPassword());

        LOGGER.debug("Media refresh response with success mediaId : {}", signInMediaResp.media.id);
        return signInMediaResp;
    }


    public List<Media> getAllMedia(User user) throws MNException {
        User savedUser = userRepository.findOne(user.id);
        if (savedUser == null) {
            throw new MNException(MNStatus.NO_SUCH_USER);
        }
        List<Media> medias = mediaRepository.findApproved();
        for (Media me : medias) {
            if (savedUser.subscriptions.contains(me.id)) {
                me.subscribed = true;
            } else {
                me.subscribed = false;
            }
        }
        medias.forEach(Media::maskDetails);
        medias.forEach(Media::setTagFromRssConfig);
        return medias;
    }

    public List<Media> getAllMedia() throws MNException {
        List<Media> medias = mediaRepository.findAll();
        medias.forEach(Media::maskDetails);
        medias.forEach(Media::setTagFromRssConfig);
        return medias;
    }

    public String updatePassword(PasswordChangeReq req) throws MNException {
        LOGGER.debug("Media updatePassword request received with id: {}", req.userId);
        Media media = mediaRepository.findOne(req.userId);
        if (media == null) {
            throw new MNException(MNStatus.NO_SUCH_MEDIA);
        }
        if (!Objects.equals(media.password, MD5.getMD5(req.oldPassword))) {
            throw new MNException(MNStatus.WRONG_CREDENTIALS);
        }
        media.password = MD5.getMD5(req.newPassword);
        mediaRepository.save(media);
        return "SUCCESS";
    }

    public Media updateBasicConfig(Media media) throws MNException {
        LOGGER.debug("Media updateBasicConfig request received with id: {}", media.id);

        Media oldMedia = mediaRepository.findOne(media.id);
        if (oldMedia == null) {
            throw new MNException(MNStatus.NO_SUCH_MEDIA);
        }
        if (!Objects.equals(oldMedia.password, MD5.getMD5(media.password))) {
            throw new MNException(MNStatus.WRONG_CREDENTIALS);
        }
        media.status= Media.MediaStatus.REGISTERED;
        oldMedia.updateBasicConfig(media);
        mediaRepository.save(oldMedia);

        return oldMedia.maskPassword();
    }

    public Media updateRssConfig(Media media) throws MNException {
        LOGGER.debug("Media updateRssConfig request received with id: {}", media.id);

        Media oldMedia = mediaRepository.findOne(media.id);
        if (oldMedia == null) {
            throw new MNException(MNStatus.NO_SUCH_MEDIA);
        }
        if (!Objects.equals(oldMedia.password, MD5.getMD5(media.password))) {
            throw new MNException(MNStatus.WRONG_CREDENTIALS);
        }

        List<Media.RssConfig> validRss = new ArrayList<>();
        for (Media.RssConfig rss : media.rssConfig) {
            validRss.add(validateRssConfig(rss));
        }

        oldMedia.updateRssConfig(validRss);
        mediaRepository.save(oldMedia);

        return oldMedia.maskPassword();
    }


    public Media.RssConfig validateRssConfig(Media.RssConfig rssConfig) throws MNException {
        if (rssConfig.tag == null || rssConfig.tag.isEmpty() || rssConfig.pollMinutes == 0) {
            throw new MNException(MNStatus.RSS_FEED_PARAMS_MISSING);
        }
        rssConfig.tag = rssConfig.tag.toLowerCase();
        if (!rssConfig.url.startsWith("http://") && !rssConfig.url.startsWith("https://")) {
            rssConfig.url = "http://".concat(rssConfig.url);
        }
        if (!(Objects.equals("common", rssConfig.tag))) {
            Tag t = new Tag(rssConfig.tag);
            LOGGER.debug("Save new tag to tag collection: {}", t);
            TagRepository.save(t);
        }
        return rssConfig;


    }

    public String resendToken(Media media) throws MNException {
        LOGGER.debug("Media access token request received with id: {}", media.id);
        Media savedMedia = mediaRepository.findOneByContactPersonEmail(media.contactPersonEmail);
        if (savedMedia == null) {
            throw new MNException(MNStatus.NO_SUCH_MEDIA);
        }
        //24 hours non-expire token
        String accessToken = authService.createJWT(savedMedia.id, media.contactPersonEmail, 1440);
        try {
            MailGunSender.SendSimpleMessage("senthalan18@gmail.com",
                    "MyNews Media Registered",
                    "Media Details: " + media.name
                            + "\n\nAccess Token: " + accessToken
                            + "\n\n\nPlease not that Access Token expired in 24 hours");
        } catch (Exception e) {
            LOGGER.error("Error while sending MailGun email", e);
        }
        return "token send to email";
    }
}
