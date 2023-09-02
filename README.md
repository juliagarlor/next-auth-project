# next-auth-project

This is Team Rocket intranet web project. Here you will find your professional villain personal data and data contact of your beloved team members. Log in and prepare for trouble!

## Structure

This project consists in two parts: a frontend and a backend connected to a Keycloak server for authentication and user management. 

- Backend is an API Rest developed in Java with Spring Boot. It is responsible for getting users data from the server. All accessible routes are securized, so only a user registered in our Keycloak realm could access them.
- Frontend is developed with NextJs using TypeScript. It connects to the Keycloak server through NextAuth, so users must log in first to have access to the rest of the platform.
- And the most important part: a folder with screenshots of the website flow. Aren't they pretty?

In order to start using and digging in this project, the first step is simply click on the code button of this repository and choose one option: you can download the project as a zip and decompress it in your favourite location, or you can copy the repository url and clone it in your desired location using the git bash, for example:

1. Open the git bash in your device and travel to the most convenient location to place the project. In my case, I would like to place it in my desktop:

```
cd desktop
```

2. Execute the clone command of git, and the folder with the project will be created and completely loaded in your current location (desktop in my case). So in the git bash I would execute the command:

```
git clone https://github.com/juliagarlor/next-auth-project.git
```

Here it is. Ok, so let's describe the first two and main parts more in deep.

## First, start your Keycloak server

In order for the backend and frontend to be able to run, your Keycloak server must be up and available for connection. Otherwise, both parts will fall since they will not be able to find any authentication or security server. You can either download a Keycloak server and run it on your computer, or run a Docker image of Keycloak. I chose the first option, you can download a Keycloak server here:

https://www.keycloak.org/downloads

Commands for running it locally are usually in the root README. Therefore, my Keycloak server runs in port 8080, so my backend application.properties and frontend .env Keycloak routes point there. If you are running a Docker image, you should change that to the proper route. 

Furthermore, I have created a realm called "Rocket" and inside this realm, some clients, users and a role called "team". I created a client for frontend and another one for backend called "frontend" and "backend", each one pointing to localhost:3000 for frontend and localhost:8081 for backend, but allowing web origins from each other. On the othen hand, my users should have a username, name, surname, email, password and an attribute called "image" pointing to an image on the internet. For example, the user's James image points to this route: https://i.pinimg.com/474x/ed/63/72/ed6372d7e077eb8cdd2ebc92fe201d6e.jpg . Each user has the role "team", so they can be recognized as part of the same team. 

## Back-end: structure and how to use it

This part has been developed in Java using Maven and Spring Boot. Let's get started with this part:

1. Choose and IDE that would allow you to work with Java. In my case, I used IntelliJ IDE for this project, but you have other options like Netbeans or Eclipse. Pick your favourite.

2. Open the backend forlder of the project with your IDE and wait a few seconds for loading the structure and dependencies of the project, this should be fast.

5. Run the project. You can do it by clicking the Run button on your IDE or by executing the following command: 

```
mvn spring-boot:run
```

Once it stops, the back end project should be listening in port 8081, so you can open Postman and test the routes of the controllers in localhost:8081. Remember to select the Bearer token for Authorization and copy a valid token for your Keycloak realm. You should now be able to obtain one sending a POST request to the following route with these body params: localhost:8080/realms/Rocket/protocol/openid-connect/token

| Key | Value |
| --- | --- | --- |
| username | (one of the realm users' username) |
| password | (the chosen user's password) |
| client_id | (backend or frontend keycloak client id, either of them should be OK) |
| client_secret | (chosen client's secret) |
| grant_type | password |


A complete list of possible routes is available at the end of this README, in the Back-end routes section.

## Front-end: structure and how to use it

Moving to the Frontend folder. This part has been developed in NextJs with Tailwind and using some elements of Materials UI. Let's run this part

1. Open the Frontend folder in your favourite IDE. I use Visual Studio.

2. User Ctrl+Shift+ñ to open a new terminal, or just go to the menu Terminal and choose the option.

3. Execute the following command to make sure everything is in updated and in order:

```
npm i
```

4. Ready! now execute this commad to wake up the app:

```
npm run dev
```

When it stops, you will find the website up and ready in http://localhost:3000.


## Back-end routes

| HTTP verb | Route | Description |
| --- | --- | --- |
| GET | /users/getuserslist | Return a list of all users in realm |
| GET | /users/team | Return a list users in realm with "team" role |

**Do not forget to add "localhost:8081" before each route.**

## Front-end routes and views

Base: http://localhost:3000.

![Log-In](screenshots/home-day.JPG)

Home: http://localhost:3000/home. **Unless you have already logged in, you will be redirected to the root page for log in**

![Home](screenshots/pokedex.JPG)
