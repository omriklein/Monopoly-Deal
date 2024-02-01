// server.ts

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import GameService from './game.service';

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

  socket.on('joinRoom', (roomKey: string, userName: string, clbk: (status: "Failed" | "Success") => void) => {
    socket.join(roomKey);
    // io.to(roomKey).emit('chatMessage', { id: 'System', message: `${socket.id} joined the room.` });
    const joinStatus = GameService.joinGame(roomKey, socket.id, userName);
    clbk(joinStatus);
  });

  // Chat things -- 

  socket.on('chatMessage', (message: string, roomKey: string) => {
    io.to(roomKey).emit('chatMessage', { id: socket.id, message });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  // Game things -- 

  socket.on('endTurn', (roomKey: string, skip?: boolean) => {
    GameService.getGame(roomKey).endTurn(skip);
  });

  socket.on("readyGame", (roomKey: string, isReady: boolean) => {
    GameService.readyGame(roomKey, socket.id, isReady);
  });

  socket.on("useCard", (roomKey: string, card: TakiCard) => {
    // TODO: make sure that it's my turn..
    GameService.getGame(roomKey).playTurn(card);
  });

  socket.on("takeCard", (roomKey: string) => {
    // TODO: make sure that it's my turn..
    // Taking using the 'takeAmount' to accumulate '+2' cards
    // GameService.getGame(roomKey).takeCards();
  });

});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
