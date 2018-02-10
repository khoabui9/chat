const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();

require('./database');
require('./seed');

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

const routes = require('./routes');
app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);

io.on('connection', (socket) => {
  console.log('a user connected id: ' + socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected id: ' + socket.id);
  });

  socket.on('username', function (data) {
    socket.username = data.username;
    console.log('user id:' + socket.id + ' connected name: ' + socket.username);
  });

  socket.on('send message', function (data) {
    console.log(data);
    io.emit('receive',{
        message: data.message,
        text: data.message,
        ref_user: data.ref_user,
        ref_room: data.ref_room
    });
    console.log('user id:' + socket.id + 'sent message ' + data.message);
  });

  socket.on('join', function(data) {
    socket.join(data.room);
    io.emit('join receive', {
      user: data.user,
      room: data.room
    })
    console.log(data.user + ' joined ' + data.room);
  });

  socket.on('leave', function(data) {
    socket.leave(data.room);
    console.log(data.user + " leaves " + data.room);
  })
})



