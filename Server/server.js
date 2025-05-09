const express = require("express");
require('dotenv').config();
const app = express();
const connectDB= require('./src/db/dbServer');
const userRoutes = require("./src/Routes/user.routes");
const bodyParser = require("body-parser");
const cors = require('cors');
const todoRoutes = require("./src/Routes/todo.routes");


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
connectDB();
app.use(bodyParser.json());
app.use(cors());

userRoutes(app);
todoRoutes(app);
