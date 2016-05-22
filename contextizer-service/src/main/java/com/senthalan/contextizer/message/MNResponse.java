package com.senthalan.contextizer.message;

public class MNResponse<T> {

    public String statusCode;
    public String statusDescription;
    public T content;

    public MNResponse() {
        this.statusCode = MNStatus.ERROR.statusCode;
        this.statusDescription = MNStatus.ERROR.statusDescription;
    }

    public MNResponse(MNStatus mnStatus) {
        this.statusCode = mnStatus.statusCode;
        this.statusDescription = mnStatus.statusDescription;
    }

    public MNResponse(T content) {
        this.statusCode = MNStatus.SUCCESS.statusCode;
        this.statusDescription = MNStatus.SUCCESS.statusDescription;
        this.content = content;
    }

    public MNResponse(T content, MNStatus mnStatus) {
        this.content = content;
        this.statusCode = mnStatus.statusCode;
        this.statusDescription = mnStatus.statusDescription;
    }

}
