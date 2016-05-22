package com.senthalan.contextizer.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@Document(collection = "news")
public class News {

    @Id
    public String id;
    public String mediaId;
    public String text;
    public String description;
    public String link;

    @Override
    public String toString() {
        return "News{" +
                "id='" + id + '\'' +
                ", mediaId='" + mediaId + '\'' +
                ", text='" + text + '\'' +
                ", description='" + description + '\'' +
                ", link='" + link + '\'' +
                '}';
    }
}
