package com.senthalan.contextizer.api;


import com.senthalan.contextizer.domain.Media;
import com.senthalan.contextizer.domain.User;
import com.senthalan.contextizer.message.MNResponse;
import com.senthalan.contextizer.message.SignInUserResp;
import com.senthalan.contextizer.message.SubscriptionReq;
import com.senthalan.contextizer.service.UserService;
import com.senthalan.contextizer.util.MNException;
import com.senthalan.contextizer.util.Authorize;
import org.apache.cxf.rs.security.cors.CrossOriginResourceSharing;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import java.util.List;

@Produces("application/json")
@CrossOriginResourceSharing(
        allowAllOrigins = true,
        allowCredentials = true,
        allowHeaders = {"Origin", "Content-Type", "Accept", "Authorization"}
)
@Path("contextizer/service/user")
public class UserApi {

    @Autowired
    UserService userService;

    @POST
    public MNResponse<SignInUserResp> registerUser(User user) throws MNException{
        return new MNResponse<>(userService.registerUser(user));
    }

    @POST
    @Path("/authenticate")
    public MNResponse<SignInUserResp> authenticate(User user) throws MNException {
        return new MNResponse<>(userService.authenticate(user));
    }

    @POST
    @Path("/refresh")
    @Authorize
    public MNResponse<SignInUserResp> refresh(User user) throws MNException {
        return new MNResponse<>(userService.refresh(user));
    }

    @POST
    @Path("/subscribe")
    @Authorize
    public MNResponse<SignInUserResp> subscribe(SubscriptionReq subscription) throws MNException {
        return new MNResponse<>(userService.subscribe(subscription));
    }
}
