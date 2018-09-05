const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('startTimer', (timer) => {
        console.log('timer started', timer);
        socket.broadcast.emit('startTimerFromOutside', timer);
    });

    socket.on('stopTimer', (timer) => {
        console.log('timer stopped', timer);
        socket.broadcast.emit('stopTimerFromOutside', timer);
    });

    socket.on('pauseTimer', (timer) => {
        console.log('timer paused', timer);
        socket.broadcast.emit('pauseTimerFromOutside', timer);
    });
});

if(!module.parent){
    server.listen(port, () => {
        console.log(`Serwer uruchomiony na porcie ${port}`);
    });
}