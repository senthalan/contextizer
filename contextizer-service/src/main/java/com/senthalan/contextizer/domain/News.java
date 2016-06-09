package com.senthalan.contextizer.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.senthalan.contextizer.util.ISODateTimeSerializer;
import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@Document(collection = "news")
public class News {

    @Id
    public String id;
    public String media;
    public String text;
    public String description;
    public String link;
    public Set<String> tags;


    public Set<String> views=new HashSet<>();

    @CreatedDate
    @JsonSerialize(using = ISODateTimeSerializer.class)
    public DateTime createdTime;


    public News(){

    }


    public News( String name, String title, String description, String link, HashSet<String> strings) {
        this.media=name;
        this.text=title;
        this.description=description;
        this.link=link;
        this.tags=strings;
    }

    @Override
    public String toString() {
        return "News{" +
                "id='" + id + '\'' +
                ", mediaId='" + media + '\'' +
                ", text='" + text + '\'' +
                ", description='" + description + '\'' +
                ", link='" + link + '\'' +
                ", tag='" + tags + '\'' +
                ", views=" + views +
                ", createdTime=" + createdTime +
                '}';
    }
}
