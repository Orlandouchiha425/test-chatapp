const express = require('express');
const app =express();
const http = require("http")  //library
const { Server } = require("socket.io");  //{server} is a library from socker io. Server is the class 
const server = http.createServer(app)  //creates server 
const cors = require('cors');
const { Socket } = require('socket.io-client');
port=3003;

app.use(cors())
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
}) 

io.on('connection', (socket)=>{
    console.log(`User Connected: ${socket.id}`)
    
    socket.on('join_room', (data)=>{
        socket.join(data)
    })


    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message",data)
    })
    
    // socket.on("send_message",(data)=>{
    // socket.broadcast.emit("receive_message",data )
    // //this will sent to everyone but yourself, it will broadcast to everyone
    // })
})




server.listen(port,function(){
    console.log(`Socket is running on port ${port}`)
})





// const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// port=300;
// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });
// const count = io.engine.clientsCount;

// const count2 = io.of("/").sockets.size;

// io.on("connection", (socket) => {
//   console.log('I am running')
// });


// httpserver.listen(port,function(){
//     console.log(`Socket is running on port ${port}`)

// });