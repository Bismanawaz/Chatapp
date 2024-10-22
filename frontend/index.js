const { io } = require('socket.io-client');

// Connect to the WebSocket server with Authorization header (JWT)
const socket = io('http://localhost:3000', {
  extraHeaders: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IklzbWFpbCIsInVzZXJJZCI6MTIsImlhdCI6MTcyOTA4MjM4MywiZXhwIjoxNzM3NzIyMzgzfQ.2yP9-vEUWVTPMfJPjWndpC-MbN9l5p6Ngoi2QRt_vNM`
  }
});

// Join a specific room (e.g., room1)
socket.emit('joinRoom', { room: 'room1' });

// Send a message to the server
socket.emit('message', { message: 'Hello from client!', room: 'room1' });

// Listen to incoming messages from the room
socket.on('message', (data) => {
  console.log('Received message from server:', data);
});

// Handle disconnection event
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Optional: Send a message every 5 seconds to keep testing communication
setInterval(() => {
  socket.emit('message', { message: 'Hello again from client!', room: 'room1' });
}, 5000);
socket.on('message', (data) => {
  console.log('Message received from server:', data);
});

// Example of listening to a custom event like 'userJoined'
socket.on('userJoined', (data) => {
  console.log('A new user joined:', data);
});

// Handling disconnect event
socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
