import React from 'react';
import TakiCard from './Components/TakiCard';
import ChatPage from './Components/ChatPage';
import LobbyPage from './Components/Lobby/Lobby.page';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GamePage from './Components/Game.page';
import Playcardtest from './Components/playcardstest.page';
import { SocketProvider } from './Context/SocketContext';
import WaitingRoom from './Components/Lobby/WaitingRoom';

const App: React.FC = () => {

  // BrowserRouter example in https://www.w3schools.com/react/react_router.asp
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" > {/* element={<LobbyPage socket={socket}/>}>  for layout*/}
            <Route index element={<LobbyPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="waitingRoom" element={<WaitingRoom/>} />
            <Route path="game" element={<GamePage />} />
            <Route path="cardDemo" element={<TakiCard card={{ color: "red", type: "number", value: 6 }} />} />
            <Route path="test" element={<Playcardtest />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </SocketProvider>
  );
};

export default App;
