'use strict';

//Not sure how many of these I can change to const. Perhaps all of them.
let express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var handlers = require('./handlers.js')(io);

const public = __dirname;
app.use(express.static(public));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//io.emit('update', `Server restarted at ${(new Date).toString()}`);

//Is making users global a dumb idea?
let users = [];

// TODO: Combine io connection event handler with initSocket
function initSocket(user) {
    handlers.chatMessage(user);

    let socket = user.socket;
    
	socket.on('disconnect', function(reason){
		io.emit('update', `${user.name} disconnected because ${reason}`);
		console.log('user disconnected');
	});
}

io.on('connection', function(socket){
	console.log('a user connected'); // debugging

    const userid = users.length;
    const username = `User ${userid}`; //Set a default username

    var user = { name: username, id: userid, socket: socket };
    users.push(user);
    initSocket(user);
});

io.on('connection', function(socket){
	io.emit('update', 'a user connected. LIT');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
    

