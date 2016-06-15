package com.senthalan.contextizer.util;

import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;

import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

public class MailGunSender {

    public static Response SendSimpleMessage(String to, String subject, String text) {

        MultivaluedMap<String, String> formData = new MultivaluedHashMap<String, String>();
        formData.add("from", "postmaster@sandbox03b42f5d4d3b4530a528b0aff53df274.mailgun.org    ");
        formData.add("to", to);
        formData.add("subject", subject);
        formData.add("text", text);

        HttpAuthenticationFeature feature = HttpAuthenticationFeature.universal("api", "key-749f695ea35f3bb6c21a9708c3a91b71");
        return ClientBuilder.newClient()
                .register(feature)
                .target("https://api.mailgun.net/v3/sandbox03b42f5d4d3b4530a528b0aff53df274.mailgun.org/messages")
                .request()
                .post(Entity.form(formData));

    }

}
