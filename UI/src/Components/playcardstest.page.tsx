/**
 * This page is a mock page to test the backend for playing the games.
 */

import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Get from context
const socket = io('http://localhost:3001'); // Adjust the URL to match your server



const Playcardtest = () => {
    const [roomKey, setRoomKey] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        socket.on('chatMessage', (data: any) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, []);

    const joinRoom = () => {
        socket.emit('joinRoom', roomKey);
    };

    const a: TakiCard = {type: "number", color: "red", value: 6};
    const useCard = () => {
        socket.emit('useCard', roomKey, a);
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('chatMessage', message, roomKey);
            setMessage('');
        }
    };

    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <div>

            <Select
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>

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


            <Button onClick={useCard}>Use Card</Button>
        </div>
    );
};

export default Playcardtest;