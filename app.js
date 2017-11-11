var express = require("express");
var app = express();
var http = require("http").Server(app);
var path = require("path");
var io = require('socket.io')(http);

var nowOnline = 0;

var messages = [

];

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/views/index.html'))
});

io.on('connection', function(socket){
    ++nowOnline;

    socket.on('disconnect', function(){
        --nowOnline;
        io.emit('now online', nowOnline);
    });

    socket.on('send message', function(msg){
        messages.push(msg);

        socket.broadcast.emit('get message', msg);
    });

    io.emit('now online', nowOnline);
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});