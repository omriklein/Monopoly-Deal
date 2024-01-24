"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
// Allow all origins for CORS in Express
app.use((0, cors_1.default)({ origin: '*' }));
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('joinRoom', (roomKey) => {
        socket.join(roomKey);
        io.to(roomKey).emit('chatMessage', { id: 'System', message: `${socket.id} joined the room.` });
    });
    socket.on('chatMessage', (message, roomKey) => {
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
