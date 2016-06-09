package com.senthalan.contextizer.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.senthalan.contextizer.util.ISODateTimeSerializer;
import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@Document(collection = "news_with_tag")
public class NewsWithTag {

    @Id
    public String id;
    public String media;
    public String text;
    public String description;
    public String link;

    public String tags;

    public List<String> keywords;

    public int webReach;

    public Set<String> views=new HashSet<>();

    @CreatedDate
    @JsonSerialize(using = ISODateTimeSerializer.class)
    public DateTime createdTime;

    public boolean seen;


    public NewsWithTag( String media, String text, String description, String link, String tags) {
        this.media = media;
        this.text = text;
        this.description = description;
        this.link = link;
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "News{" +
                "id='" + id + '\'' +
                ", mediaId='" + media + '\'' +
                ", text='" + text + '\'' +
                ", description='" + description + '\'' +
                ", link='" + link + '\'' +
                ", tags=" + tags +
                ", keywords=" + keywords +
                '}';
    }

    public NewsWithTag calculateSeen(String userId){
        this.seen = views.contains(userId);
        webReach=views.size();
        views=null;
        return this;
    }
}
