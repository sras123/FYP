const express = require('express')
require('dotenv/config')
require('./config/databaseConnection')
const cors= require('cors');
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));
app.use(express.json())
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({extended: true}))

//routes
const authorizeRoute = require('./Routes/authorizeRoute')
app.use('/', authorizeRoute)

const userRoute = require('./Routes/userRoute')
app.use('/', userRoute)

app.listen(8080, (req, res, next)=> {
    console.log("Listening the server")
}
)

