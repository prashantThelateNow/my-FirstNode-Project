const express = require('express');
const router = express.Router();
const studentInfoController = require("./../../app/controllers/studentInfoController");
const mysqlCon = require('./../../app/dbConn/mysqlCon');
const mySqlConnection = mysqlCon.mySqlDbConnection;

/* inserting student info */
router.post('/insertInfo', studentInfoController.insertStudentInfo);


/* Update student Info */
router.post('/updateInfo', (req, res, next) => {
    if(!req.body.Id || !req.body.address){
        res.send({status: 'N/A', statusDesc: 'Either parameter not passed or wrong parameter !'});
    }else{
        const query = `UPDATE student_info SET Address = '${req.body.address}' WHERE Id = '${req.body.Id}'`;
        mySqlConnection.query(query, (err, rows, fields) => {
            if(!err){
                res.send({statusCode: 0, msg: 'Data updated successfully!'});
            }else{
                console.log('Some error ocurred!');
            }
        });
    }
});


/* Fetch student Info */
router.get('/fetchInfo', (req, res, next) => {
    const query = 'SELECT * from student_info';
    mySqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            if(rows.length == 0){
                res.send({statusCode: -1, msg: 'No data found!'});
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
    if(!req.body.Id){
        res.send({status: 'N/A', statusDesc: 'Either parameter not passed or wrong parameter !'});
    }else{
        const query = `DELETE FROM student_info WHERE Id = '${req.body.Id}'`;
        mySqlConnection.query(query, (err, rows, fields) => {
            if(!err) {
                res.send({statusCode: 0, msg: 'Record Deleted Successfully!'});
            }else{
                console.log('some error ocurred!');
            }
        })
    }

});


module.exports = router;