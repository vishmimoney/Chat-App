const express = require('express');
const http = require('http');
const appRootPath = require('app-root-path');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const app = express();


app.use(express.static(appRootPath.resolve('app')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).sendFile(appRootPath.resolve('app/index.html'));
});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', function(socket){
    console.log('User connected');

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

server.listen(process.env.PORT || '8080', () => {
    console.log('Server is listening');
});





