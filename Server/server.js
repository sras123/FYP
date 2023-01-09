const express= require('express');
const app= express()
require("dotenv").config();
const cors= require('cors');
const connection= require("./db");
const userRoutes= require('./Routes/users');
const authRoutes= require('./Routes/auth');



connection()
app.use(cors({ origin: "*" }));
app.use(express.json())


//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080; 
app.listen(port, console.log(`Listening on port ${port}...`));