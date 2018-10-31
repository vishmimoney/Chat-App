const express = require('express');
const http = require('http');
const appRootPath = require('app-root-path');
const bodyParser = require('body-parser');
const io = require('socket.io');

const app = express();

app.use(express.static(appRootPath.resolve('app')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).sendFile(appRootPath.resolve('app/index.html'));
});

const server = http.createServer(app);
server.listen(process.env.PORT || '8080', () => {
    console.log('Server is listening');
});





