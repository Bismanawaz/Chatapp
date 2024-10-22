const { io } = require('socket.io-client');

// JWT token generated manually for testing
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJpc21hIiwidXNlcklkIjoxMSwiaWF0IjoxNzI5MDc0Mjc4LCJleHAiOjE3Mzc3MTQyNzh9.ifhmE2zR4GGmXl8rTO0xrYZZRdVExAZynuBqu0WtCz4';

// Connect to the WebSocket server
const socket2 = io('http://localhost:3000', {
  extraHeaders: {
    Authorization: `Bearer ${token}` // Use valid token
  }
});

// Join room1
socket2.emit('joinRoom', { room: 'room1' });

// Send a message to the room
socket2.emit('message', { message: 'Hello from client 2!', room: 'room1' });

// Listen to messages from the room
socket2.on('message', (data) => {
  console.log('Client 2 received:', data);
});

// Handle disconnection
socket2.on('disconnect', () => {
  console.log('Client 2 disconnected');
});
