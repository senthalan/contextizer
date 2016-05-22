package com.senthalan.contextizer.util;


import com.senthalan.contextizer.message.MNStatus;

public class MNException extends Exception {

    public MNStatus status;

    public MNException(MNStatus status) {
        super(status.statusDescription);
        this.status = status;
    }

    @Override
    public String toString() {
        return "contextizerException{" +
                "status=" + status +
                '}';
    }
}
