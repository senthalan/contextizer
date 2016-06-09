package com.senthalan.contextizer.message;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class NewsSearchReq {
    public String mediaId;
    public String tag;
    public String userId;
    public int skip = 0;
    public int limit = 30;

    public NewsSearchReq(String mediaId, String tag, String userId,int skip , int limit) {
        this.mediaId = mediaId;
        this.tag = tag;
        this.userId=userId;
        this.skip = skip;
        this.limit = limit;
    }

    public NewsSearchReq() {
    }

    public NewsSearchReq(String mediaId, String tag, String userId) {
        this.mediaId=mediaId;
        this.tag=tag;
        this.userId=userId;
    }

    @Override
    public String toString() {
        return "NewsSearchReq{" +
                "mediaId='" + mediaId + '\'' +
                ", tag='" + tag + '\'' +
                ", userId=" + userId +
                ", skip=" + skip +
                ", limit=" + limit +
                '}';
    }
}
