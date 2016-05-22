package com.senthalan.contextizer.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@Document(collection = "media")
public class Media {

    @Id
    public String id;
    public String name;
    public String password;

    public String contactPersonName;
    public String contactPersonPhone;
    public String contactPersonEmail;
    public String webUrl;
    public String facebookUrl;
    public List<String> tags = new ArrayList();
    public List<RssConfig> rssConfig = new ArrayList();
    public boolean subscribed;

//    todo: how?
    public String language;


    @Override
    public String toString() {
        return "Media{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", password='" + "********" + '\'' +
                ", contactPersonName='" + contactPersonName + '\'' +
                ", contactPersonPhone='" + contactPersonPhone + '\'' +
                ", contactPersonEmail='" + contactPersonEmail + '\'' +
                ", rssConfig=" + rssConfig +
                ", webUrl='" + webUrl + '\'' +
                ", facebookUrl='" + facebookUrl + '\'' +
                ", language=" + language +
                '}';
    }

    public boolean validateRegister() {
        return name != null && !name.trim().isEmpty() &&
                contactPersonName != null && !contactPersonName.trim().isEmpty() &&
                contactPersonPhone != null && !contactPersonPhone.trim().isEmpty() &&
                contactPersonEmail != null && !contactPersonEmail.trim().isEmpty();
    }

    public boolean validateSignIn() {
        return name != null && !name.isEmpty() &&
                password != null && !password.isEmpty();
    }

    public Media maskPassword() {
        this.password = null;
        return this;
    }

    public Media maskDetails() {
        this.password = null;
        this.contactPersonName = null;
        this.contactPersonEmail = null;
        this.contactPersonPhone = null;
        return this;
    }

    public Media updateBasicConfig(Media media) {
        this.contactPersonName = media.contactPersonName;
        this.contactPersonPhone = media.contactPersonPhone;
        this.contactPersonEmail = media.contactPersonEmail;
        this.webUrl = media.webUrl;
        this.facebookUrl = media.facebookUrl;
        return this;
    }

    public Media setTagFromRssConfig(){
        this.rssConfig.forEach(e -> {
            this.tags.add(e.tag);
        });
        return this;
    }

    public  Media updateRssConfig(List<RssConfig> rssConfig){
        this.rssConfig = rssConfig;
        return this;
    }

    public enum MediaStatus {
        INITIAL, APPROVED, SUSPENDED
    }

    public static class RssConfig {
        public String tag;
        public String url;
        public int pollMinutes;

        @Override
        public String toString() {
            return "RssConfig{" +
                    "tag='" + tag + '\'' +
                    ", url='" + url + '\'' +
                    ", pollMinutes=" + pollMinutes +
                    '}';
        }

    }
}
