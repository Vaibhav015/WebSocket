var express = require('express');
var socket = require('socket.io');
//App setup

var app = express();
var server = app.listen(3000, function(){
	console.log('Listening to request on port: 3000');
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
	console.log('made socket connection', socket.id);

	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	});

});