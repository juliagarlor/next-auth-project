package com.backend.users.controller;

import com.backend.users.service.IService;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET, RequestMethod.POST,RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.PATCH})
@RequestMapping("/users")
public class Controller {

	@Autowired
	private IService usersService;

	@GetMapping("/getuserslist")
	public List<UserRepresentation> getUsersList(@AuthenticationPrincipal Jwt jwt) {
		return usersService.getUsersList(jwt);
	}

	@GetMapping("/team")
	public List<String> getTeamUsers(@AuthenticationPrincipal Jwt jwt){
		return usersService.getTeamUsers(jwt);
	}
}

