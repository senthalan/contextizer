package com.senthalan.contextizer.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@Document(collection = "user")
public class User {

    @Id
    public String id;
    public String msisdn;
    @Indexed(unique = true, sparse = true, name = "user_email")
    public String email;
    public String password;

    public List<String> subscriptions = new ArrayList<>();
    public UserStatus status;


    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", msisdn='" + msisdn + '\'' +
                ", email='" + email + '\'' +
                ", password='" + "********" + '\'' +
                ", subscriptions=" + subscriptions +
                ", status=" + status +
                '}';
    }

    public boolean validateRegister() {
        return email != null && !email.trim().isEmpty() &&
                password != null && !password.trim().isEmpty();
    }

    public User maskPassword() {
        password = "********";
        return this;
    }


    public enum UserStatus {
        INITIAL, REGISTERED
    }

    public static class TagCount {
        public String tag;
        public int count;

        public TagCount(String tag, int count) {
            this.tag = tag;
            this.count = count;
        }

        public TagCount() {
        }
    }
}
