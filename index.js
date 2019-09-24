const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => console.log('server is running on port ' + port));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})

// javascript namespace
const javascript = io.of('javascript');
// const react = io.of('react')

javascript.on('connection', (socketServer) => {
	console.log('user connected');
	socketServer.on('message', (msg) => {
		console.log('message ' + msg);
		javascript.emit('message', msg)
	});

	socketServer.on('disconnect', () => {
		console.log('user disconnected');
		javascript.emit('message', 'user disconnected')
	})

	// socketServer.emit('message', { boty: 'Hey!, How are you?' })
	// socketServer.on('anotherEvent', (data) => console.log(data))
}) 

