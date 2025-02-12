# UberEats-clone
In this project a food delivery system is being developed in which restaurants and customers register themselves. This system is similar to Uber Eats application. The tech stack used to develop the system consist of Node.js (Express) for backend, React for frontend and MongoDB for database and Kafka as message broker service. User can register themself as customer or restaurant. Restaurant users can add/update/delete the dishes which they serve and can see/update the orders that are done by the customers. Customer orders can see the restaurants in their city and can filter through the restaurants and can order dishes from the restaurants.

## Tech Stack: ReactJS, NodeJS, Redux, MongoDB, Kafka and Passport-JWT 

## System Design 
![image](https://github.com/user-attachments/assets/15c24438-b212-44bf-a171-17fd0aaba11b)


### How to set up this project ? 
> Please follow below steps:
Git clone the repository.

## Back End

Open the terminal in the folder "backend".
Execute "npm install" or "npm i" to install all the dependencies.
Run node index.js

## Kafka Back End
Download Kafka zip and install in your local machine
Create topics as mentioned in server.js file
Open the terminal in the folder "kafka-backend".
Execute "npm install" or "npm i" to install all the dependencies.
Create an account in https://www.mongodb.com/cloud/atlas. Fetch the connection uri and update this path in config.js file for mongoDB variable.
Update the appServer & backendServer.
Run node server.js

## Front End
Open the terminal in the folder "frontend".
Execute "npm install" or "npm i" to install all the dependencies.
Execute "npm start" to run the front end server. Run npm start.
This will launch the application
Install REDUX Dev tools extension on chrome to see the Redux state changes

Open the browser and navigate to Front end server's IP address with Port number (Eg: localhost:3000)

## Application Demo: 
https://www.youtube.com/watch?v=fzRbj5F-HR8




