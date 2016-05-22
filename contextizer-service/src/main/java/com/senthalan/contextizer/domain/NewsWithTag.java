package com.senthalan.contextizer.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@Document(collection = "news_with_tag")
public class NewsWithTag {

    @Id
    public String id;
    public String mediaId;
    public String text;
    public String description;
    public String link;

    public Set<String> tags;



    public NewsWithTag(){

    }

    public NewsWithTag(String mediaId, String mediaName, String text, String description, String link, Set<String> tags) {
        this.mediaId = mediaId;
        this.text = text;
        this.description = description;
        this.link = link;
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "News{" +
                "id='" + id + '\'' +
                ", mediaId='" + mediaId + '\'' +
                ", text='" + text + '\'' +
                ", description='" + description + '\'' +
                ", link='" + link + '\'' +
                ", tags=" + tags +
                '}';
    }
}
