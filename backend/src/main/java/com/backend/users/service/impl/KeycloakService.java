package com.backend.users.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.apachecommons.CommonsLog;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@CommonsLog
public class KeycloakService {

    @Value("${keycloak.auth-server-url}")
    private String serverUrl;

    @Value("${keycloak.realm}")
    private String realm;

    public List<UserRepresentation> getUserList(String token) throws IOException {
        log.info(serverUrl);
        List<UserRepresentation> users = new ArrayList<>();

//        Establishing connection to keycloak server
        log.info("Connecting to Keycloak server");
        URL url = new URL(serverUrl + "admin/realms/" + realm + "/users");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Authorization", "Bearer " + token);

//        Obtaining response
        log.info("Obtaining response");
        int status = con.getResponseCode();

        if (status == 200){
            log.info("Reading users list");
//            Reading incoming users list
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine = null;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();

//            Parse to UserRepresentation list
            ObjectMapper mapper = new ObjectMapper();
            users = mapper.readValue(content.toString(), new TypeReference<List<UserRepresentation>>(){});
        } else {
            log.error("Failed request");
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong in the request");
        }

        log.info("Returning filled list");
        return users;
    }

    public List<UserRepresentation> getTeamUsers(String token) throws IOException {
        log.info(serverUrl);
        List<UserRepresentation> users = new ArrayList<>();

//        Establishing connection to keycloak server
        log.info("Connecting to Keycloak server");
        URL url = new URL(serverUrl + "admin/realms/" + realm + "/roles/team/users");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Authorization", "Bearer " + token);

//        Obtaining response
        log.info("Obtaining response");
        int status = con.getResponseCode();

        if (status == 200){
            log.info("Reading reviewers list");
//            Reading incoming users list
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine = null;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();

//            Parse to UserRepresentation list
            ObjectMapper mapper = new ObjectMapper();
            users = mapper.readValue(content.toString(), new TypeReference<List<UserRepresentation>>(){});
        } else {
            log.error("Failed request");
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong in the request");
        }

        log.info("Returning filled list");
        return users;
    }
}
