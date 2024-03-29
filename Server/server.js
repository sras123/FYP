const express = require('express')
require('dotenv/config')
require('./config/databaseConnection')
const cors= require('cors');
const morgan = require("morgan");
const app = express();
const http = require("http");
const{Server} = require("socket.io");
const fileUpload = require('express-fileupload')


app.use(morgan("tiny"));
app.use(express.json())
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({ useTempFiles: true}))

//routes
const authorizeRoute = require('./Routes/authorizeRoute')
app.use('/', authorizeRoute)

const userRoute = require('./Routes/userRoute')
app.use('/', userRoute)

const doctorCategoryRoute = require('./Routes/doctorCategoryRouter')
app.use('/', doctorCategoryRoute)

const doctor = require('./Routes/doctorRouter')
app.use('/',doctor)

const upload = require('./Routes/upload')
app.use('/',upload)

const reviewRoute = require('./Routes/reviewRoute')
app.use('/',reviewRoute)

const applyDoctorRoute = require('./Routes/applyDoctor')
app.use('/', applyDoctorRoute)

const khaltiRoutes= require('./Routes/khaltiRoutes')
app.use('/', khaltiRoutes);


// Socket.IO
const server = http.createServer(app);
//creating a socket.IO server instance
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
//handles the events when a user connects to the server
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

//handles the event when a user joins a room
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  //handles the event when a user sends a message
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  //handles the event when a user disconnets from the server
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


//Port for Server
server.listen(8080, (req, res, next)=> {
    console.log("Listening the server")
}
);

