var express = require("express");
var app = express();
var http = require("http").Server(app);
var path = require("path");
var io = require('socket.io')(http);

var usersCount = 0;

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/views/index.html'))
});

io.on('connection', function(socket){
    ++usersCount;

    socket.on('disconnect', function(){
        --usersCount;
        io.emit('users_count', {count: usersCount});
    });

    io.emit('users_count', {count: usersCount});
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});