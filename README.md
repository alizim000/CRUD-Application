## Node JS CRUD Application Development
###### Programming CA-2 Group assignment 

### Summary
In this project, We have used Azure and a CRUD (Create, Read, Update, Delete) application, created using Node.js, Express framework, and MySQL database. The application was tested and implemented using REST API with Postman. The project focused on managing student information, which was stored in a MySQL database with a table named "studentdetails." The application allowed users to create, read, update, and delete student records from the database through a user system. The implementation was successful and tested using Postman to ensure that the API endpoints were working correctly.

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

* Installing Mysql Database
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
![image](https://user-images.githubusercontent.com/103967847/231862220-ec507df6-e55d-4812-b47b-769afdde8d48.png)

#### Created StoredProducer in MYSQL

```sql
CREATE DEFINER=`ali123`@`alimo.northeurope.cloudapp.azure.com` PROCEDURE `studentAddOrEdit`(
IN _student_id INT,
IN _student_name VARCHAR(45),
IN _student_email VARCHAR(45),
IN _course_id INT
)
BEGIN
IF _student_id = 0 THEN
INSERT INTO studentdetails(student_name,student_email,course_id)
VALUES (_student_name,_student_email,_course_id);
SET _student_id = last_insert_id();
ELSE
UPDATE studentdetails
SET
student_name = _student_name,
student_email = _student_email,
course_id = _course_id
WHERE student_id = _student_id;
END IF;
SELECT _student_id AS 'student_id';
END
```



#### Create script.js
###### which will help in retrieving the data from the created database, Script.js is the root file and also acts as the entry point of this application. It will contain all the routers and drivers in it. Along with this, it is also responsible for invoking the server and establish the connection. after creating script.js file import the required packages in application and for that, we need to write below code  [Mysql Database integration - Reference](https://expressjs.com/en/guide/database-integration.html#mysql)
```javascript
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

##### In above JS code, we first import the required packages express and mysql. We then create a connection to the MySQL database by passing the database details to the mysql.createConnection() method. We start the server by calling the app.listen() method and specifying the port number to listen on. We then connect to the database using the db.connect() method. Next, we create an instance of Express and define a route to retrieve data from the database. In this example, we use a simple SQL query to select all the data from a table in the database. We then pass the SQL query to the db.query() method and send the result back to the client using the res.send() method.

##### To run the script, simply navigate to the directory containing the script.js file in your terminal and type npm start. This will start the server and we can  access the data by navigating to http://localhost:3000/students in browser or Postman.


![image](https://user-images.githubusercontent.com/103967847/231881327-df8912ca-0d74-4c8a-9e92-e4a693b2ec3c.png)



### Crud Application TEST

#### GET 


![image](https://user-images.githubusercontent.com/103967847/231881948-6234ae95-5751-4cc7-987e-b2ae4324a6f7.png)



#### POST

![image](https://user-images.githubusercontent.com/103967847/231883778-a78a5b99-613f-4bf8-9022-ee884884811e.png)

![image](https://user-images.githubusercontent.com/103967847/231884410-df7dd3ec-f371-4a93-bef2-fd782049fb01.png)

#### PUT








##### we used my sql database to store student information 


vineet cintribution






