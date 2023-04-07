const mysql = require('mysql2');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

//MySQL details
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

//Establish the server connection
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

//Router to GET specific student detail from the MySQL database
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
