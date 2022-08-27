package io.github.abdullahh10.EmployeeManagerAPI.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message) {
        super(message);
    }
}
