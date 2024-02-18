import { Button } from "@mui/material";
import { useSocekt } from "../../Context/SocketContext";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const useQuery = () => {
    const {search} = useLocation();
    return useMemo(()=>new URLSearchParams(search), [search]);
};

interface WaitingRoomProps {
    roomKey: Number
};
const WaitingRoom =  () => {// (props: WaitingRoomProps) => {
    const socket = useSocekt();
    const navigate = useNavigate();
    const query = useQuery();

    const roomKey = query.get("roomKey");//props.roomKey;
    const welcomeMessage = `Waiting room for room ${roomKey}`;

    const [playerReadyState, setPlayerReadyState] = useState(false);

    useEffect(() => {
        socket.on('startGame', () => {
            navigate('/game');
        });
    });

    const playerReady = () => {
        const newReadyState = !playerReadyState;
        setPlayerReadyState(newReadyState);
        socket.emit('readyGame', roomKey, newReadyState);
    };

    return (
        <>
            <div>{welcomeMessage}</div>
            <Button variant="contained" onClick={playerReady}>{playerReadyState ? "Not ": ""}Ready</Button>
        </>
    );
}

export default WaitingRoom;