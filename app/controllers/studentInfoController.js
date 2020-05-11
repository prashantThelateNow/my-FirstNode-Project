const express = require('express');
const mysqlCon = require('./../../app/dbConn/mysqlCon');
const mySqlConnection = mysqlCon.mySqlDbConnection;


let insertStudentInfo = (req, res, next) => {
    if(!req.body.name || !req.body.class || !req.body.rollNo || !req.body.age || !req.body.address){
        res.send({status: 'N/A', statusDesc: 'Either parameter not passed or wrong parameter !'});
    }else{
        const query = `INSERT INTO student_info (Name, Class, Roll_No, Age, Address) VALUES ('${req.body.name}', '${req.body.class}' , '${req.body.rollNo}' , '${req.body.age}' , '${req.body.address}')`;
        mySqlConnection.query(query, (err, rows, fields) => {
            if(!err){
                res.send({statusCode: 0, msg: 'Data Inserted successfully!'});
            }else{
                console.log('some error ocurred!');
            }
        })
    }
}



module.exports = {insertStudentInfo: insertStudentInfo}