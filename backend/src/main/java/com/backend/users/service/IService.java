package com.backend.users.service;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface IService {
    List<UserRepresentation> getUsersList(Jwt jwt);

    List<String> getTeamUsers(Jwt jwt);
}
