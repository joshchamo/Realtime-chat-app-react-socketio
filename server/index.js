const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const cors = require('cors');

/* set PORT to 5000, when deploying PORT will use process.env.PORT settings
   pass to server.listen(PORT) */
const PORT = process.env.PORT || 5000;

// create router.js server file for express routes and require
const router = require('./router');

const app = express();
// pass the app initialized above in express to http.createServer
const server = http.createServer(app);
// pass the server initialized above to the socketio instance
// const io = socketio(server);

// updated io with CORS settings for modern browser validation
// const io = require('socket.io')(server, {
//   cors: { origin: '*', methods: ['GET', 'POST'] },
// });

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});
// httpServer.listen(3000);

/* on the server-side we get a socket object which extends the Node.js EventEmitter class: */
io.on('connection', (socket) => {
  console.log('We have a new connection!!!');
  socket.send('Helloo!');

  socket.on('join test', ({ name, room }, callback) => {
    console.log(name, room);

    const error = true;

    // if (error) {
    //   callback({error: 'testing error callback'});
    // }
  });
  /* inside the io.on function use socket.on to manage this instance of the socket object which just joined */
  socket.on('disconnect', () => {
    console.log('User has left!');
  });
});

// once router.js is set up it can be called as a middleware to use
app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
