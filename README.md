## Node Js CRUD Application Development
###### Programming CA-2 Group assignment 

### Summary
In this project, a CRUD (Create, Read, Update, Delete) application was created using Node.js, Express framwork, and MySQL database. The application was tested and implemented using REST API with Postman. The project focused on managing student information, which was stored in a MySQL database with a table named "studentdetails." The application allowed users to create, read, update, and delete student records from the database through a user system. The implementation was successful and tested using Postman to ensure that the API endpoints were working correctly. Overall, this project demonstrated how to use Node.js and MySQL to create a functional CRUD application for managing student data.

#### The project will be having the below structure 
* package.json
* server.js

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

#### Setting up the DB Database 

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

* Creating Table "studentdetails" on Mysql work bench

![image](https://user-images.githubusercontent.com/103967847/230727693-e14c644f-ec51-4bbb-89be-05d8fb124c10.png)
```
select * from studentdetais
```
![image](https://user-images.githubusercontent.com/103967847/230727823-4ac6111e-58d6-482f-89f8-397206115c5d.png)

#### Create script.js
###### which will help in retrieving the data from the created database, Script.js is the root file and also acts as the entry point of this application. It will contain all the routers and drivers in it. Along with this, it is also responsible for invoking the server and establish the connection. after creating script.js file import the required packages in application and for that, we need to write below code  [Mysql Database integration - Reference (https://expressjs.com/en/guide/database-integration.html#mysql)
```
const mysql = require('mysql2');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

//MySQL details// 
var mysqlConnection = mysql.createConnection({
    host: 'alimo.northeurope.cloudapp.azure.com',
    user: 'ali123',
    password: 'Dubai2$$',
    database: 'student',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the student details from the MySQL Database
app.get('/students', (req, res) => {
    mysqlConnection.query('SELECT * FROM studentdetails', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Router to GET specific student details from the MySQL database
app.get('/students/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM studentdetails WHERE student_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Router to INSERT/POST a student's detail
app.post('/students', (req, res) => {
    let student = req.body;
    var sql = "SET @student_id = ?;SET @student_name = ?;SET @student_email = ?;SET @course_id = ?; CALL studentAddOrEdit(@student_id, @student_name, @student_email, @course_id); ";
    mysqlConnection.query(sql, [student.student_id, student.student_name, student.student_email, student.course_id], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array)
                    res.send('New Student ID : ' + element[0].student_id);
            });
        else
            console.log(err);
    })
});


//Router to UPDATE a student's detail
app.put('/students', (req, res) => {
    let student = req.body;
    var sql = "SET @student_id = ?;SET @student_name = ?;SET @student_email = ?;SET @course_id = ?; CALL studentAddOrEdit(@student_id, @student_name, @student_email, @course_id); ";
    mysqlConnection.query(sql, [student.student_id, student.student_name, student.student_email, student.course_id], (err, rows, fields) => {
        if (!err)
            res.send('student Details Updated Successfully');
        else
            console.log(err);
    })
});

//Router to DELETE a student's detail
app.delete('/student/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM studentdetails WHERE student_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Student Record deleted successfully.');
        else
            console.log(err);
    })
});

```






