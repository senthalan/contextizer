package com.senthalan.contextizer.message;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.senthalan.contextizer.domain.NewsWithTag;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class RelatedNewsResponse {
    public String newsId;
    public List<NewsWithTag> relatedNews;

    public RelatedNewsResponse(){

    }

    @Override
    public String toString() {
        return "NewsClickReq{" +
                "newsId='" + newsId+ '\'' +
                '}';
    }
}
