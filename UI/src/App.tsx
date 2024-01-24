// src/App.tsx

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

interface Message {
  id: string;
  message: string;
}

const socket = io('http://localhost:3001'); // Adjust the URL to match your server

const App: React.FC = () => {
  const [roomKey, setRoomKey] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('chatMessage', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const joinRoom = () => {
    socket.emit('joinRoom', roomKey);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chatMessage', message, roomKey);
      setMessage('');
    }
  };

  return (
    <div>
      <label htmlFor="roomKey">Room Key:</label>
      <input type="text" id="roomKey" value={roomKey} onChange={(e) => setRoomKey(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.id}: {msg.message}
          </li>
        ))}
      </ul>

      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default App;
