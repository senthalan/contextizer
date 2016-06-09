package com.senthalan.contextizer.api;


import com.senthalan.contextizer.domain.Media;
import com.senthalan.contextizer.domain.User;
import com.senthalan.contextizer.message.MNResponse;
import com.senthalan.contextizer.message.PasswordChangeReq;
import com.senthalan.contextizer.message.SignInMediaResp;
import com.senthalan.contextizer.service.MediaService;
import com.senthalan.contextizer.util.Authorize;
import com.senthalan.contextizer.util.MNException;
import org.apache.cxf.rs.security.cors.CrossOriginResourceSharing;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import java.util.List;

@Produces("application/json")
@CrossOriginResourceSharing(
        allowAllOrigins = true,
        allowCredentials = true,
        allowHeaders = {"Origin", "Content-Type", "Accept", "Authorization"}
)
@Path("contextizer/service/media")
public class MediaApi {
    private static final Logger LOGGER = LoggerFactory.getLogger(MediaService.class);

    @Autowired
    MediaService mediaService;

    @POST
    public MNResponse<String> registerMedia(Media media) throws MNException {
        return new MNResponse<String>(mediaService.registerMedia(media));
    }


    @POST
    @Path("/getall")
    @Authorize
    public MNResponse<List<Media>> getAllMedia(User user) throws MNException {
        LOGGER.debug("get all media with user params: {}", user);
        return new MNResponse<>(mediaService.getAllMedia(user));
    }


    @POST
    @Path("/authenticate")
    public MNResponse<SignInMediaResp> signIn(Media media) throws MNException {
        LOGGER.debug("Media SignIn request received with params : {}", media);
        return new MNResponse<>(mediaService.SignIn(media));
    }

    @POST
    @Path("/refresh")
    @Authorize
    public MNResponse<SignInMediaResp> refresh(Media media) throws MNException {
        return new MNResponse<>(mediaService.refresh(media));
    }

    @PUT
    @Path("/password")
    @Authorize
    public MNResponse<String> updatePassword(PasswordChangeReq req) throws MNException {
        return new MNResponse<String>(mediaService.updatePassword(req));
    }

    @PUT
    @Path("/basicConfig")
    @Authorize
    public MNResponse<Media> updateBasicConfig(Media media) throws MNException {
        return new MNResponse<Media>(mediaService.updateBasicConfig(media));
    }

    @PUT
    @Path("/rssConfig")
    @Authorize
    public MNResponse<Media> updateRssConfig(Media media) throws MNException {
        return new MNResponse<Media>(mediaService.updateRssConfig(media));
    }

}
