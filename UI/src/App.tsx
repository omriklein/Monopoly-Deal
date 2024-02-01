import React from 'react';
import TakiCard from './Components/TakiCard';
import ChatPage from './Components/ChatPage';
import LobbyPage from './Components/Lobby/Lobby.page';
import './App.css'
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const App: React.FC = () => {

  return (
    <div id="appContiner" style={{width: '100dvw', height: '100dvh'}}>
      {/* <ChatPage/> */}
      <LobbyPage socket={socket}/>
    </div>
  );
};

export default App;
