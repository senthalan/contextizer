package com.senthalan.contextizer.message;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class PasswordChangeReq {

    public String userId;
    public String oldPassword;
    public String newPassword;

    @Override
    public String toString() {
        return "PasswordChangeReq{" +
                "userId='" + userId + '\'' +
                '}';
    }
}
