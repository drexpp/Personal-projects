var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const socketServer = require('./lib/socket_server');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/views'));

io.on('connection', function(socket){
	socketServer.eventsHandler(socket);
});


http.listen(port, function(){
  console.log(`listening on ${port}`);
});
