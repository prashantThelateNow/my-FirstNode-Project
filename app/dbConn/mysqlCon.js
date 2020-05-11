const express = require('express');
const mysql = require('mysql');


/* Establish MySql Database Connection */
const mySqlDbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'student_db'
  });
  
  mySqlDbConnection.connect(error => {
    if(!error){
      console.log(`DB Connection Succeded! as ${mySqlDbConnection.threadId}`);
    }else{
      console.log(`DB Connection Failed! as ${error.stack}`);
    }
  });

  module.exports = {mySqlDbConnection: mySqlDbConnection};