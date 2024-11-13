# ENSF-614-Term-Project
A Movie Theater Ticket Reservation App

## To run the backend
1. Click the green play button next to the main class `DemoApplication`
1. Test that the backend is working by going to http://localhost:8080/api/users/test
    1. You should see "Backend is working!"

### To setup the backend (Don't run these commands, just included for reference)
1. Create a springboot project in IntelliJ
1. Select `Spring` when creating a new project
1. Configure with setting:
    1. Build System: `Maven`
    1. JDK: `17+`
    1. Java: `17`
    1. Packaging: `Jar`
1. Select the following dependancies
    1. Under `Web`, select `Spring Web`
    1. Under `SQL`, select `Spring Data JPA` and `H2 Database`

## To run the frontend
1. Ensure you are in the correct directory: `cd MovieTheaterApp`
1. To ensure all of the packages are installed: `npx install`
1. To run the program: `npx expo start`
1. Once the program is running, specify `w` to open the project in a web browser.

### To setup the frontend (Don't run these commands, just included for reference)
1. To start the initalization process: `npx create-expo-app --template`
1. Choose the following template: `blank`
1. Name the app: `MovieTheaterApp`

