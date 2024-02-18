import { Box, Button, Modal, TextField, Typography, styled } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocekt } from '../../Context/SocketContext';

const LobbyLayout = styled(`div`)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: `100%`,
    height: `100%`,
});

const RulesModal = styled(Modal)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'black',
    width: '400px',
    border: `2px solid black`,
    boxShadow: '24px',
    color: 'white',
    padding: '10px',
    overflow: 'auto',
    '::-webkit-scrollbar': {
        display: 'none'
    }
});

const LobbyPage = () => {

    const socket = useSocekt();
    const navigate = useNavigate();

    const roomName = useRef<HTMLInputElement>();
    const userName = useRef<HTMLInputElement>();

    const [rulesOpen, setRulesOpen] = useState<boolean>(false);

    const gotoWaitingRoom = () => {
        navigate(`/waitingRoom?roomKey=${roomName.current?.value}`);
    }

    const clbk = (status: "Failed" | "Success") => {
        if (status === 'Success') {
            alert('cool, joined');
            gotoWaitingRoom();
        } else {
            alert('not cool - failed!');
        }
    }

    const loginToRoom = () => {
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
            <Button variant='contained' onClick={() => setRulesOpen(true)}>Game Rules</Button>
            <RulesModal
                open={rulesOpen}
                onClose={() => setRulesOpen(false)}
                aria-labelledby='modal-title'
                aria-describedby='modal-desc'>
                <Box>
                    <Typography id='modal-title' variant='h6' component="h2">Rules of the game</Typography>
                    <Typography id='modal-desc'>There are the rules of the game... There are the rules of the game... There are the rules of the game... There are the rules of the game... There are the rules of the game... There are the rules of the game... There are the rules of the game...There are the rules of the game...There are the rules of the game...There are the rules of the game...There are the rules of the game...There are the rules of the game...</Typography>
                    <Button onClick={()=>setRulesOpen(false)}>Close Rules</Button>
                </Box>
            </RulesModal>
        </LobbyLayout>
    );
};

export default LobbyPage;