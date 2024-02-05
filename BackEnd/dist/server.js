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
const game_service_1 = __importDefault(require("./game.service"));
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
    socket.on('joinRoom', (roomKey, userName, clbk) => {
        socket.join(roomKey);
        // io.to(roomKey).emit('chatMessage', { id: 'System', message: `${socket.id} joined the room.` });
        const joinStatus = game_service_1.default.joinGame(roomKey, socket.id, userName);
        if (clbk) {
            clbk(joinStatus);
        }
    });
    // Chat things -- 
    socket.on('chatMessage', (message, roomKey) => {
        io.to(roomKey).emit('chatMessage', { id: socket.id, message });
    });
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
    // Game things -- 
    socket.on('endTurn', (roomKey, skip) => {
        game_service_1.default.getGame(roomKey).endTurn(skip);
    });
    socket.on("readyGame", (roomKey, isReady) => {
        game_service_1.default.readyGame(roomKey, socket.id, isReady);
    });
    socket.on("useCard", (roomKey, card) => {
        // TODO: make sure that it's my turn..
        game_service_1.default.getGame(roomKey).playTurn(card);
    });
    socket.on("takeCard", (roomKey) => {
        // TODO: make sure that it's my turn..
        // Taking using the 'takeAmount' to accumulate '+2' cards
        // GameService.getGame(roomKey).takeCards();
    });
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
