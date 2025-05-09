const mongoose = require("mongoose");

const connectDB = ()=>{

    // const dbURL = "mongodb+srv://mili:qwerty123@cluster0.1pnue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const dbURL = process.env.DB_URL;
    mongoose.connect(dbURL)
    .then(()=>{
        console.log("Connected to DB Succesfully");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB;