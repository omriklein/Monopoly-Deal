import React, { createContext, useContext, ReactNode } from "react";
import { Socket, io } from "socket.io-client";

interface SocketContextType {
    socket: Socket
};

const SocketContext = createContext<SocketContextType| undefined>(undefined);


interface Props {
    children: ReactNode
};
export const SocketProvider: React.FC<Props> = ({children}) => {
    const socket = io('http://localhost:3001'); // TODO: change to be dynamic with env variables
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocekt = () : Socket => {
    const context = useContext(SocketContext);
    if(!context){
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context.socket;
};