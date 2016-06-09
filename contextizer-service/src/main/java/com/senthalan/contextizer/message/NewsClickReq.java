package com.senthalan.contextizer.message;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class NewsClickReq {
    public String newsId;
    public String userId;

    public NewsClickReq(String newsId, String userId){
        this.newsId=newsId;
        this.userId=userId;
    }

    public NewsClickReq(){

    }

    @Override
    public String toString() {
        return "NewsClickReq{" +
                "newsId='" + newsId+ '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
