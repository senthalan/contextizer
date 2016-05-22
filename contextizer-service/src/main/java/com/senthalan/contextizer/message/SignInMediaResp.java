package com.senthalan.contextizer.message;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.senthalan.contextizer.domain.Media;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class SignInMediaResp {

    public String accessToken;
    public Media media;

    public SignInMediaResp(String accessToken, Media media) {
        this.accessToken = accessToken;
        this.media = media;
    }

}
