const express = require('express');
const socketio = require('socket.io');
const http = require('http');

/* set PORT to 5000, when deploying PORT will use process.env.PORT settings
   pass to server.listen(PORT) */
const PORT = process.env.PORT || 5000;

// create router.js server file for express routes and require
const router = require('./router');

const app = express();
// pass the app initialized above in express to http.createServer
const server = http.createServer(app);
// pass the server initialized above to the socketio instance
const io = socketio(server);

/* on the server-side we get a socket object which extends the Node.js EventEmitter class: */
io.on('connection', (socket) => {
  console.log('We have a new connection!');
  /* inside the io.on function use socket.on to manage this instance of the socket object which just joined */
  socket.on('disconnect', () => {
    console.log('User has disconnected');
  });
});

// once router.js is set up it can be called as a middleware to use
app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
