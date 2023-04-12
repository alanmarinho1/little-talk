import 'dotenv/config'
import express from 'express'
import routes from './router/routes'
import { Server } from 'socket.io'
import DebugRequests from './middleware/nameRequest'
import http from 'http'


const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(DebugRequests);
app.use(express.json())
app.use(routes)


io.on('connection', (socket) => {
    console.log(`a user ${socket.id} connected`);
    socket.on('disconnect', () => {
        console.log(`a user ${socket.id} disconnected`);
      });
    socket.on('receive-message', (value) => {
        console.log(`O user ${socket.id} mandou a mensagem: ${value}`)
    })
    socket.on('foo', (value) => {
        console.log("Foo do nada: ",value);
    })
  });





const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

server.listen(PORT, () => {
    console.log(`Server is on at port ${PORT}`)
})