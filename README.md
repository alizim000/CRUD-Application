## Programming-ca2
###### Group assignment 

### Sumary

In this project, a CRUD (Create, Read, Update, Delete) application was created using Node.js, Express framwork, and MySQL database. The application was tested and implemented using REST API with Postman. The project focused on managing student information, which was stored in a MySQL database with a table named "studentdetails." The application allowed users to create, read, update, and delete student records from the database through a user system. The implementation was successful and tested using Postman to ensure that the API endpoints were working correctly. Overall, this project demonstrated how to use Node.js and MySQL to create a functional CRUD application for managing student data.

#### Requirements

* Node.js
* Npm
* Express Frame Work
* MySQL2
* Nodemon
* Postman

#### Installing the required packages using the below commands
```
sudo apt install nodejs
install npm
npm install  --s express express-handlebars mysql2 body-parser nodemon
```

#### Creating a Package.json file using below command
```
npm init
```
```
{
  "name": "programming-ca2",
  "version": "1.0.0",
  "description": "Programming CA2 group assignment ",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "repository": {
    "type": "",
    "url": "https://github.com/alizim000/group-ca2.git"
  },
  "author": "Ali Moinuddin, Azhar Khan, Vineet Kumar",
  "license": "ISC",
  "homepage": "",
  "dependencies": {
    "body-parser": "^1.20.2",
    "express": "^4.18.2",
    "express-handlebars": "^7.0.4",
    "mysql": "^2.18.1",
    "mysql2": "^3.2.0",
    "nodemon": "^2.0.22"
  },
  "devDependencies": {}
}
```

#### Setting up the DB Database  Table 

* Installing Mysql Databse
```
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql.service
```
* Creating DB user 
```
Sudo Mysql
create user 'ali123'@'%' identified by 'XXXX';
```
* Creating DB 
```
create database student;
```
* Enabling the Permision on user
```
grant all privileges on student.* to 'ali123'@'%';
flush privileges;
show databases;
```
![image](https://user-images.githubusercontent.com/103967847/230727485-4d39c497-9a61-407e-a254-2b7b862c0d53.png)



