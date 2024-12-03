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
1. Test that the backend is working by going to http://localhost:8080/api/registered-users/test
    1. You should see "Backend is working!"

## To run the frontend
1. Ensure you are in the correct directory: `cd MovieTheaterApp`
1. To ensure all the packages are installed: `npx expo install`
1. To run the program: `npx expo start`
1. Once the program is running, specify `w` to open the project in a web browser.

## To connect to the database
1. Ensure that you've run the backend, as that should create the database `ENSF614PROJECT`
1. Connect to the database throught the `MySQL Workbench`
1. Check that it worked with `SHOW DATABASES;`
    1. `ENSF614PROJECT` should appear in the results.

## To connect to email-backend - using the Terminal
1. Ensure you are in the correct directory: `cd email-backend`
1. To ensure all the packages are installed:
   1. `npm install nodemailer`
   1. `npm install express`
   1. `npm install cors`
1. Run the backend: `node server.js`
1. To change the email that sends the Users Notifications:
   1. Update the Email, and Passwords for each template in `email-backend/server.js`

## Code to run when errors occur
### Frontend
1. When you are trying to install the package, but you're getting version error 
    - `npm install --save-dev --legacy-peer-deps`
1. When a package is too new to work
    - `npm i packagename@X.X.X`

### Backend
1. When the springboot isn't recognized 
    - `mvn -U idea:idea`

### email-backend
Steps to Resolve the Issue:

1. Kill the Process Using Port 5000
   1. You need to stop the process currently using port 5000. Here's how:
      1. On Windows:
         1. Open Terminal, Command Prompt or PowerShell and run:
            1. netstat -ano | findstr :5000
            1. This will show a list of processes using port 5000. Look for the PID (Process ID).
               1. Kill the process using:
               1. taskkill /PID <PID> /F
                  1. (Replace <PID> with the actual PID from the previous command.)
      1. On macOS/Linux: Run the following commands:
         1. lsof -i :5000
         1. kill -9 <PID>
1. Make sure you are in the email-backend directory:
   1. cd email-backend
1. Start the Backend: Ensure the backend is running and accessible:
   1. node server.js
1. Run the React Native App: Start your React Native app:
   1. npm start

## (If needed) To create email-backend - using the Terminal
1. Initialize a Node.js project
   1. mkdir email-backend
   1. cd email-backend
   1. npm init -y
1. Install Nodemailer
   1. npm install nodemailer
   1. npm install express
   1. npm install cors
1. Create a server.js file in the email-backend directory:
   1. email-backend/server.js (already created)
1. Run the backend
   1. node server.js

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

