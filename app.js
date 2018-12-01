var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var socket = require('socket.io');
// socket setup

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var commonRouter = require('./routes/common');
var carpoolRouter = require('./routes/carpool');
var carpoolerRouter = require('./routes/carpooler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/common', commonRouter);
app.use('/carpool', carpoolRouter);
app.use('/carpooler', carpoolerRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
// socket setup
server.listen(8080);
var io = socket(server);
console.log('Express server started on port %s', server.address().port);

// list of online users
var onlinelist = [];

// connecting clients and waiting for actions
io.on('connection', function (socket) {
    // this will show every user joins with their sockedID
    console.log('Made socket connection', socket.id);

    // this event fires everytime a user comes online
    // sends current list of online users to every other user online
    // parameter data is the details of user who came online
    socket.on('u_online', function (data) {
        // stored online list has users with these attributes below
        onlinelist.push({
            socketid: socket.id,
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname
        });

        // this is the object to broadcast to online users
        // we don't need socketID to be broadcasted
        var onlinedata = {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname
        };

        // sending online list to every other user
        socket.broadcast.emit('su_online', onlinedata);
    });

    // this event fires everytime a user sends a message
    // sends the chat message to targetted user
    // parameter data is the message with sender and receiver names
    socket.on('u_chat', function (data) {
        // traversing through online list to find targetted user
        onlinelist.forEach(user => {
            if (user.username == data.recipient) {
                // sending chat message with sender name to found user
                socket.to(user.socketid).emit('su_msg', {
                    message: data.message,
                    sender: data.sender
                });
            }
        });
    });

    // this event fires everytime a user is typing message
    // sends typing status to the other end of the chat
    // parameter data is the username of the person who is typing
    socket.on('u_typing', function (data) {
        onlinelist.forEach(user => {
            if (user.username == data.recipient) {
                socket.to(user.socketid).emit('su_typing', data.sender);
            }
        });
    });
});

// event naming:
// u_something means user has emitted a message
// su_something means server is emitting a message

module.exports = app;
