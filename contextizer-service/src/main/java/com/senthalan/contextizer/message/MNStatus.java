package com.senthalan.contextizer.message;

public enum MNStatus {

    SUCCESS("S1000", "Success"),
    ERROR("E1000", "Unknown error occurred in operation"),
    DB_ERROR("E1001", "Unknown error occurred in operation"),
    NO_ENTRY_FOUND("E1002", "Empty results from database"),

    MISSING_REQUIRED_PARAMS("E1010", "One or more required parameters are missing"),
    MEDIA_NAME_NOT_AVAILABLE("E1011", "Media name is not available"),
    USER_EMAIL_NOT_AVAILABLE("E1012", "User email is not available"),
    NO_SUCH_MEDIA("E1013", "No such media exists"),
    WRONG_CREDENTIALS("E1014", "User name and password does not match"),
    NO_SUBSCRIBERS("E1015", "You have no subscribers for the moment"),
    RSS_FEED_PARAMS_MISSING("E1016", "Rss configuration can not have 0 or empty values"),
    NO_SUCH_USER("E1017", "No such user exists"),

    TOKEN_EXPIRED("E0498", "Access token expired"),
    TOKEN_ERROR("E0499", "Access token error"),
    UNAUTHORIZED("E0401", "Unauthorized request"),
    ALREADY_LOGIN("E9999","already logged in");

    public final String statusCode;
    public final String statusDescription;

    MNStatus(String statusCode, String successDescription) {
        this.statusCode = statusCode;
        this.statusDescription = successDescription;
    }

    public boolean isSuccess() {
        return this.statusCode.equals(MNStatus.SUCCESS.statusCode);
    }
}
