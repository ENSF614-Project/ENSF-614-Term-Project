# ENSF-614-Term-Project
A Movie Theater Ticket Reservation App

## Prerequisites (make sure you have at least the following for the program to work)
1. MySQL Workbecch `8.0`
1. Node.js `18.20.4`
1. JDK `21.0.5`
1. Java `17`
1. Maven `3.9.9`
1. VS Code `Any version`
1. IntelliJ `2024.3`

## To run the backend
1. Open the Backend `acmeplex` folder in `IntelliJ`
1. Ensure that you update the line `spring.datasource.password=YOUR_PASSWORD_HERE` in `application.properties` to be whatever your `root` password is
    1. This file is on the path `acmeplex\src\main\resources\application.properties`
        1. Will need to find a way to ignore this file, just don't commit it for the meantime when you update it.
1. Click the green play button next to the main class `AcmeplexApplication`
    1. This file is on the path `acmeplex\src\main\java\org\example\acmeplex\AcmeplexApplication.java`
1. Test that the backend is working by going to http://localhost:8080/api/users/test
    1. You should see "Backend is working!"

## To run the frontend
1. Ensure you are in the correct directory: `cd MovieTheaterApp`
1. To ensure all of the packages are installed: `npx expo install`
1. To run the program: `npx expo start`
1. Once the program is running, specify `w` to open the project in a web browser.


## To connect to the database
1. Ensure that you've run the backend, as that should create the database `ENSF614PROJECT`
1. Connect to the database throught the `MySQL Workbench`
1. Check that it worked with `SHOW DATABASES;`
    1. `ENSF614PROJECT` should appear in the results.

## Code to run when errors occur
### Frontend
1. When you are trying to install the package, but you're getting version error 
    - `npm install --save-dev --legacy-peer-deps`

### Backend
1. When the springboot isn't recognized 
    - `mvn -U idea:idea`

## I don't think that you'll need to run the commands below this line, they are just included for reference

### To setup the backend 
1. Create a springboot project in IntelliJ
1. Select `Spring` when creating a new project
1. Configure with setting:
    1. Name: `acmeplex`
    1. Build System: `Maven`
    1. JDK: `21`
    1. Java: `17`
    1. Packaging: `Jar`
1. Select the following dependancies
    - `Spring Web`
    - `Spring Data JPA`
    - `MySQL Driver`
    - `Lombok`
    - `Spring Boot DevTools`

### To setup the frontend
1. To start the initalization process: `npx create-expo-app --template`
1. Choose the following template: `blank`
1. Name the app: `MovieTheaterApp`

