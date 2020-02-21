'use strict';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('app-module-path').addPath(baseDir);

// Serve static files
app.use(express.static('public'));

// Routes
app.use(require('./routes'));

io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});

server.listen(8080, () => {
	console.log('Server listening on port 8080');
});
