const express = require('express');
const { Server } = require("socket.io");
const routeMessage = require('./middleware/nameRequest')
const app = express();
const http = require('http');
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(routeMessage);

app.get('/', (req, res) => {
    res.send("Hello world");
})

io.on('connection', (socket) => {
    console.log(`a user ${socket.id} connected`);
    socket.on('disconnect', () => {
        console.log(`a user ${socket.id} disconnected`);
      });
  });

server.listen(3000, () => {
    console.log('Server is on at port 3000')
})