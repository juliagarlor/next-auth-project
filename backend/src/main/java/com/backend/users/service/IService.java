package com.backend.users.service;

import com.backend.users.utils.dtos.ShortUserDTO;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface IService {
    List<UserRepresentation> getUsersList(Jwt jwt);

    List<ShortUserDTO> getTeamUsers(Jwt jwt);
}
