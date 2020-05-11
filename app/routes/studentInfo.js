const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/* Establish MySql Database Connection */
const mySqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'student_db'
  });
  
  mySqlConnection.connect(error => {
    if(!error){
      console.log(`DB Connection Succeded! as ${mySqlConnection.threadId}`);
    }else{
      console.log(`DB Connection Failed! as ${error.stack}`);
    }
  });

/* inserting student info */
router.post('/insertInfo', (req, res, next) => {
    const query = "INSERT INTO student_info (Name, Class, Roll_No, Age, Address) VALUES ('Prashant3', '10th', '57', '25', 'Chaibasa')";
    mySqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.send({statusCode: 0, msg: 'Data Inserted successfully!'});
        }else{
            console.log('some error ocurred!');
        }
    })
});


/* Update student Info */
router.post('/updateInfo', (req, res, next) => {
    

});


/* Fetch student Info */
router.get('/fetchInfo', (req, res, next) =>{
    const query = 'SELECT * from student_info';
    mySqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            if(!rows){
                res.send({statusCode: 0, msg: 'No data found!'});
            }else{
                res.send({statusCode: 0, data: rows});
            }
        }else{
            console.log('some error ocurred!');
        }

    })
});

/* Delete student Info */
router.post('/deleteInfo', (req, res, next) => {

});


module.exports = router;