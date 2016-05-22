package com.senthalan.contextizer.message;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class SubscriptionReq {
    public List<String> mediaId = new ArrayList<>();
    public String userId;

    @Override
    public String toString() {
        return "SubscriptionReq{" +
                "mediaId='" + mediaId + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
