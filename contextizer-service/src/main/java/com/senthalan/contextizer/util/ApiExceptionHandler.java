package com.senthalan.contextizer.util;


import com.senthalan.contextizer.message.MNResponse;
import com.senthalan.contextizer.message.MNStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class ApiExceptionHandler implements ExceptionMapper<Exception> {

    private static Logger logger = LoggerFactory.getLogger(ApiExceptionHandler.class);

    @Override
    @Produces(MediaType.APPLICATION_JSON)
    public Response toResponse(Exception e) {

        MNResponse mnResponse;
        if (e instanceof MNException) {
            logger.debug("contextizerException handled: {}", e.toString());
            MNStatus status = ((MNException) e).status;
            mnResponse = new MNResponse(status);
        } else {
            logger.error("Exception ", e);
            mnResponse = new MNResponse(MNStatus.ERROR);
        }

        return Response
                .ok()
                .entity(mnResponse)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}
