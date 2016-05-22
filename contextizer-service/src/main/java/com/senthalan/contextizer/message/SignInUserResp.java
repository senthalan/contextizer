package com.senthalan.contextizer.message;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.senthalan.contextizer.domain.User;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class SignInUserResp {

    public String accessToken;
    public User user;

    public SignInUserResp(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }

}
