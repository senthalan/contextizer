package com.senthalan.contextizer.util;

import com.senthalan.contextizer.message.MNResponse;
import com.senthalan.contextizer.message.MNStatus;
import com.senthalan.contextizer.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;


@Authorize
public class AuthorizationFilter implements ContainerRequestFilter, ContainerResponseFilter {

    @Autowired
    AuthService authService;

    @Override
    public void filter(ContainerRequestContext containerRequestContext) {
        String authToken = containerRequestContext.getHeaders().getFirst("Authorization");
        if (authToken == null) {
            containerRequestContext.abortWith(buildResponse(MNStatus.UNAUTHORIZED));
        } else {
            int returnCode = authService.parseJWT(authToken);
            if (returnCode == 498) {
                containerRequestContext.abortWith(buildResponse(MNStatus.TOKEN_EXPIRED));
            } else if (returnCode == 499) {
                containerRequestContext.abortWith(buildResponse(MNStatus.TOKEN_ERROR));
            }
        }
    }

    @Override
    public void filter(ContainerRequestContext containerRequestContext, ContainerResponseContext containerResponseContext) throws IOException {
    }

    private Response buildResponse(MNStatus mnStatus) {
        return Response
                .ok()
                .entity(new MNResponse(mnStatus)).
                        type(MediaType.APPLICATION_JSON)
                .build();
    }
}