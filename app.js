var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {

});

io.on('connection', function(socket) {
    socket.on("new_user", function(username) {
        socket.username = username;
        socket.broadcast.emit("connected", socket.username);
    });

    socket.on('disconnect', function() {
        socket.broadcast.emit("disconnected", socket.username);
    });

    socket.on('msg', function(msg) {
        io.emit('msg', {
            username: socket.username,
            msg: msg
        });
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
