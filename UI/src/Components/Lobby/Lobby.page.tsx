import { Button, TextField, styled } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';

const LobbyLayout = styled(`div`)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: `100%`,
    height: `100%`,
});

interface LobbyPageProps {
    socket: Socket
}

const LobbyPage = (props: LobbyPageProps) => {

    const {socket} = props;

    const roomName = useRef<HTMLInputElement>();
    const userName = useRef<HTMLInputElement>();
    
    const navigate = useNavigate();

    const gotoGame = () => {
        navigate("/game");
    }

    const clbk = (status: "Failed" | "Success") => {
        if(status === 'Success'){
            alert('cool, joined');
            gotoGame();
        } else {
            alert('not cool - failed!');
        }
    }

    const loginToRoom = () => {
        // alert(`${userName.current?.value} joins ${roomName.current?.value}`)
        socket.emit('joinRoom', roomName.current?.value, userName.current?.value, clbk);
    }

    // mui - TextField vs Input
    return (
        <LobbyLayout>
            <TextField
                type='text'
                inputRef={roomName}
                label={"Room Name"}
                variant='filled'
                color='secondary'
                style={{
                    backgroundColor: 'gray',
                }}
            />
            <TextField
                type='text'
                inputRef={userName}
                label="User Name"
                variant='filled'
                style={{
                    backgroundColor: 'gray',
                }}
            />
            <Button variant='contained' onClick={loginToRoom}>Enter Game</Button>
        </LobbyLayout>
    );
};

export default LobbyPage;