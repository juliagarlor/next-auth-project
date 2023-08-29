package com.backend.users.service.impl;

import com.backend.users.service.IService;
import lombok.extern.apachecommons.CommonsLog;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@CommonsLog
public class UsersService implements IService {

    @Autowired
    private KeycloakService keycloakService;

    @Override
    public List<UserRepresentation> getUsersList(Jwt jwt) {
        List<UserRepresentation> output = new ArrayList<>();
        try {
            log.info("Fetching all registered users");
            output = keycloakService.getUserList(jwt.getTokenValue());
        } catch (IOException e) {
            log.error("Unable to read response: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to read response");
        }

        log.info(String.format("Returning %s users", output.size()));
        return output;
    }

    @Override
    public List<String> getTeamUsers(Jwt jwt) {
        List<UserRepresentation> output = new ArrayList<>();
        try {
            log.info("Fetching users from user team");
            output = keycloakService.getTeamUsers(jwt.getTokenValue());
        } catch (IOException e) {
            log.error("Unable to read response: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to read response");
        }

        log.info(String.format("Returning %s users", output.size()));
        return output.stream()
                .map(userRepresentation -> userRepresentation.getFirstName() + " " + userRepresentation.getLastName())
                .toList();
    }
}
