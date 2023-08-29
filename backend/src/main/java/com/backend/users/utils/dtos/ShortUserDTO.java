package com.backend.users.utils.dtos;

import org.keycloak.representations.idm.UserRepresentation;

public class ShortUserDTO {

    private String name;
    private String surname;
    private String email;

    public ShortUserDTO() {
    }

    public ShortUserDTO(UserRepresentation userRepresentation) {
        setName(userRepresentation.getFirstName());
        setSurname(userRepresentation.getLastName());
        setEmail(userRepresentation.getEmail());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
