package com.example.vetapp.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiError {
    private int status;
    private String message;
    private Object details;

    public ApiError(int status, String message, Object details) {
        this.status = status;
        this.message = message;
        this.details = details;
    }
} 