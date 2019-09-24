const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3000;

server.listen(port, () => console.log("server is running on port " + port));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/javascript", (req, res) => {
	res.sendFile(__dirname + "/public/jsRoom.html");
  });

// javascript namespace
const javascript = io.of("/javascript");
// const react = io.of('react')

javascript.on("connection", socketServer => {
  
	socketServer.on("join", data => {
    	socketServer.join(data.room);
    	javascript
    		.in(data.room)
			.emit("message", `new user joined the ${data.room} room`);
	});

	socketServer.on("message", data => {
		console.log("message " + data.msgValue);
		javascript.in(data.room).emit("message", data.msgValue);
	});

	socketServer.on("disconnect", () => {
		console.log("user disconnected");
		javascript.emit("message", "user disconnected");
  	});

  // socketServer.emit('message', { boty: 'Hey!, How are you?' })
  // socketServer.on('anotherEvent', (data) => console.log(data))
});
