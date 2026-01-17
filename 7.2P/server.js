const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let currentQueueNumber = 0;

/**
 * Socket connection
 */
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Send current queue value to newly connected client
  socket.emit("queue:update", currentQueueNumber);

  socket.on("queue:join", () => {
    currentQueueNumber++;
    io.emit("queue:update", currentQueueNumber);
  });

  socket.on("queue:reset", () => {
    currentQueueNumber = 0;
    io.emit("queue:update", currentQueueNumber);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Smart QueueMate running on http://localhost:${PORT}`);
});
