/* MODULES */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* VARIABLES */
var users = [];


app.use(express.static('public'));

app.get('/', function(req, res) {

});

io.on('connection', function(socket) {

    socket.emit("online", users);

    socket.on("new_user", function(username) {
        socket.username = username;
        users.push(username);
        socket.broadcast.emit("connected", socket.username);
    });

    socket.on('disconnect', function() {

        var i = users.indexOf("" + socket.username);
        if (i != -1) {
            users.splice(i, 1);
        }
        socket.broadcast.emit("disconnected", socket.username);
    });

    socket.on('msg', function(msg) {
        socket.broadcast.emit('msg', {
            username: socket.username,
            msg: msg
        });
    });

    socket.on("typing", function(user) {
    	socket.broadcast.emit("typing", user);
    });

    socket.on("stop-typing", function(user) {
    	socket.broadcast.emit("stop-typing", user);
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
