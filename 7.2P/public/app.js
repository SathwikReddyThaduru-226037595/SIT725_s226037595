const socket = io();

const queueNumberEl = document.getElementById("queueNumber");
const joinBtn = document.getElementById("joinQueueBtn");
const resetBtn = document.getElementById("resetQueueBtn");

// Listen for queue updates from server
socket.on("queue:update", (value) => {
  queueNumberEl.textContent = value;
});

// Join queue
joinBtn.addEventListener("click", () => {
  socket.emit("queue:join");
});

// Reset queue
resetBtn.addEventListener("click", () => {
  socket.emit("queue:reset");
});
