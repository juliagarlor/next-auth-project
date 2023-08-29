package com.backend.users.controller;

import com.backend.users.service.impl.UsersService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.keycloak.representations.idm.UserRepresentation;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class ControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    private UsersService usersService;

    private MockMvc mockMvc;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void givenValidAuthentication_whenGetUsersList_thenReturnUserRepresentationList() throws Exception {
        UserRepresentation user = new UserRepresentation();
        user.setFirstName("testName");
        List<UserRepresentation> output = List.of(user);

        Mockito.when(usersService.getUsersList(Mockito.any())).thenReturn(output);

        MvcResult result = mockMvc.perform(get("/users/getuserslist"))
                .andExpect(status().isOk()).andReturn();
        assertTrue(result.getResponse().getContentAsString().contains("\"firstName\":\"testName\","));
    }

    @Test
    void givenValidAuthentication_whenGetReviewersList_thenReturnStringList() throws Exception {
        List<String> output = List.of("Pepe Lorente", "Juan Castro");

        Mockito.when(usersService.getTeamUsers(Mockito.any())).thenReturn(output);

        MvcResult result = mockMvc.perform(get("/users/users/reviewers"))
                .andExpect(status().isOk()).andReturn();
        assertTrue(result.getResponse().getContentAsString().contains("\"Pepe Lorente\",\"Juan Castro\""));
    }
}