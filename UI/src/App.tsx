import React from 'react';
import TakiCard from './Components/TakiCard';
import ChatPage from './Components/ChatPage';
import LobbyPage from './Components/Lobby/Lobby.page';
import './App.css'
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GamePage from './Components/Game.page';

const socket = io('http://localhost:3001');

const App: React.FC = () => {

  // BrowserRouter example in https://www.w3schools.com/react/react_router.asp
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" > {/* element={<LobbyPage socket={socket}/>}>  for layout*/}
          <Route index element={<LobbyPage socket={socket} />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="game" element={<GamePage socket={socket} />} />
          <Route path="cardDemo" element={<TakiCard card={{color: "red", type:"number", value: 3}}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter >
    // <div id="appContiner" style={{width: '100dvw', height: '100dvh'}}>
    //   {/* <ChatPage/> */}
    //   <LobbyPage socket={socket}/>
    // </div>
  );
};

export default App;
