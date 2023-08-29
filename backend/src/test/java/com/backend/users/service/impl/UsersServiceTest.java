package com.backend.users.service.impl;

import org.junit.jupiter.api.Test;
import org.keycloak.representations.idm.UserRepresentation;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UsersServiceTest {

    @InjectMocks
    private UsersService usersService;

    @Mock
    private KeycloakService keycloakService;

    @Test
    void givenValidJWT_whenGetUsersList_thenReturnUserRepresentatioList() throws IOException {
        String testToken = "jaiokghnvahn";
        Jwt jwtMock = Mockito.mock(Jwt.class);
        Mockito.when(jwtMock.getTokenValue()).thenReturn(testToken);
        UserRepresentation user = new UserRepresentation();
        List<UserRepresentation> output = List.of(user);

        Mockito.when(keycloakService.getUserList(testToken)).thenReturn(output);

        assertTrue(usersService.getUsersList(jwtMock).size() > 0);
    }

    @Test
    void givenValidJWT_whenGetUsersList_thenIOExceptionReturnInternalServerError() throws IOException {
        String testToken = "jaiokghnvahn";
        Jwt jwtMock = Mockito.mock(Jwt.class);
        Mockito.when(jwtMock.getTokenValue()).thenReturn(testToken);

        Mockito.when(keycloakService.getUserList(testToken)).thenThrow(new IOException());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> usersService.getUsersList(jwtMock));
        assertTrue(exception.getStatusCode().is5xxServerError());
        assertEquals("Unable to read response", exception.getReason());
    }

    @Test
    void givenValidJWT_whenGetReviewersList_thenReturnStringList() throws IOException {
        String testToken = "jaiokghnvahn";
        Jwt jwtMock = Mockito.mock(Jwt.class);
        Mockito.when(jwtMock.getTokenValue()).thenReturn(testToken);
        UserRepresentation user = new UserRepresentation();
        List<UserRepresentation> output = List.of(user);

        Mockito.when(keycloakService.getTeamUsers(testToken)).thenReturn(output);

        assertTrue(usersService.getTeamUsers(jwtMock).size() > 0);
    }

    @Test
    void givenValidJWT_whenGetReviewersList_thenIOExceptionReturnInternalServerError() throws IOException {
        String testToken = "jaiokghnvahn";
        Jwt jwtMock = Mockito.mock(Jwt.class);
        Mockito.when(jwtMock.getTokenValue()).thenReturn(testToken);

        Mockito.when(keycloakService.getTeamUsers(testToken)).thenThrow(new IOException());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> usersService.getTeamUsers(jwtMock));
        assertTrue(exception.getStatusCode().is5xxServerError());
        assertEquals("Unable to read response", exception.getReason());
    }
}