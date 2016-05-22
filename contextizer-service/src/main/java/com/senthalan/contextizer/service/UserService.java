package com.senthalan.contextizer.service;


import com.senthalan.contextizer.domain.Media;
import com.senthalan.contextizer.domain.User;
import com.senthalan.contextizer.message.MNStatus;
import com.senthalan.contextizer.message.SignInUserResp;
import com.senthalan.contextizer.message.SubscriptionReq;
import com.senthalan.contextizer.repo.MediaRepository;
import com.senthalan.contextizer.repo.UserRepository;
import com.senthalan.contextizer.util.MD5;
import com.senthalan.contextizer.util.MNException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    MediaRepository mediaRepository;

    @Autowired
    AuthService authService;


    public SignInUserResp registerUser(User user) throws MNException {
        LOGGER.debug("User registerUser req received with params : {}", user);

        if (!user.validateRegister()) {
            throw new MNException(MNStatus.MISSING_REQUIRED_PARAMS);
        }
        if(userRepository.findByEmail(user.email)!=null){
            throw new MNException(MNStatus.USER_EMAIL_NOT_AVAILABLE);
        }
        user.status = User.UserStatus.INITIAL;
        user.password = MD5.getMD5(user.password);
        User savedUser = userRepository.save(user);
        if (savedUser == null) {
            throw new MNException(MNStatus.DB_ERROR);
        }
        userRepository.save(user);

        SignInUserResp signInUserResp;

        //24 hours non-expire token
        String accessToken = authService.createJWT(savedUser.id, user.email, 1440);
        signInUserResp = new SignInUserResp(accessToken, savedUser.maskPassword());
        return signInUserResp;
    }

    public SignInUserResp authenticate(User user) throws MNException {
        LOGGER.debug("User authenticate req received with params : {}", user);

        SignInUserResp signInUserResp;

        if (!user.validateRegister()) {
            throw new MNException(MNStatus.MISSING_REQUIRED_PARAMS);
        }
        User userExists = userRepository.findByEmail(user.email);
        if(userExists==null){
            throw new MNException(MNStatus.NO_ENTRY_FOUND);
        }
        if (!Objects.equals(userExists.password, MD5.getMD5(user.password))) {
            throw new MNException(MNStatus.WRONG_CREDENTIALS);
        }
        //24 hours non-expire token
        String accessToken = authService.createJWT(userExists.id, user.email, 1440);
        signInUserResp = new SignInUserResp(accessToken, userExists.maskPassword());
        return signInUserResp;
    }

    public SignInUserResp refresh(User user) throws MNException {
        LOGGER.debug("User refresh request received with params : {}", user);

        SignInUserResp signInUserResp;

        User savedUser = userRepository.findByEmail(user.email);
        if (savedUser == null) {
            throw new MNException(MNStatus.NO_SUCH_USER);
        }
        //24 hours non-expire token
        String accessToken = authService.createJWT(savedUser.id, user.email, 1440);
        signInUserResp = new SignInUserResp(accessToken, savedUser.maskPassword());

        LOGGER.debug("User refresh response with success userId : {}", signInUserResp.user.id);
        return signInUserResp;

    }

    public User subscribe(SubscriptionReq subscriptionReq) throws MNException {
        LOGGER.debug("User SubscriptionReq received with params : {}", subscriptionReq);

        List<Media> Medias=new ArrayList<>();
        for (int mId=0; mId<subscriptionReq.mediaId.size(); mId++){
            Media media = mediaRepository.findOne(subscriptionReq.mediaId.get(mId));
            if (media == null) {
                throw new MNException(MNStatus.NO_SUCH_MEDIA);
            }
            Medias.add(media);
        };
        User user = userRepository.findOne(subscriptionReq.userId);
        if (user == null) {
            throw new MNException(MNStatus.NO_SUCH_USER);
        }
        user.subscriptions=subscriptionReq.mediaId;

        return userRepository.save(user);
    }
}
