const express = require('express');
const serverConfig = require('./config/server.config.js')
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config.js')
const userModel = require('./models/user.model.js')
const bcrpyt = require('bcrypt');

const app = express();

//Logic to connect to DB
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", ()=> {
    console.log("Error while connecting to DB");
});

db.once("open", ()=> {
    console.log("DB is connected");

    init();
});

async function  init(){
    //initialise mongo   
    //create admin

    //check if user is already present
    let admin = userModel.findOne({
        userId: "admin"
    })

    if(admin){
        console.log("Admin is already present");
        return;
    }

    admin = await userModel.create({
        name: 'Vishwa Mohan',
        userId: 'admin',
        email: 'kankvish@gmail.com',
        userType: 'ADMIN',
        password: bcrpyt.hashSync('welcome1',8)
    });
    console.log(admin);
}


app.listen(serverConfig.PORT, ()=> {
    console.log(`Server started on port: ${serverConfig.PORT}`);
});