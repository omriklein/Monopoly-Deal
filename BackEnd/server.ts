// server.ts

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Allow all origins for CORS in Express
app.use(cors({ origin: '*' }));

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('joinRoom', (roomKey: string) => {
    socket.join(roomKey);
    io.to(roomKey).emit('chatMessage', { id: 'System', message: `${socket.id} joined the room.` });
  });

  socket.on('chatMessage', (message: string, roomKey: string) => {
    io.to(roomKey).emit('chatMessage', { id: socket.id, message });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
