import { createContext, useEffect, useState } from "react";

import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

export const socket = io("http://localhost:5000", {
    withCredentials: true
});

export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        socket.on('connected', (res) => {
            //setTitle(res.title);
            //setCount(res.count);
            console.log(res)
        });
        socket.on('counterIncremented', (res) => {
            //setCount(res);
            // dispatch(setCount(res));
        });
        socket.on('counterDecremented', (res) => {
            //setCount(res);
            // dispatch(setCount(res));
        });

        return () => {
            socket.off('connected');
            socket.off('counterIncremented');
            socket.off('counterDecremented');
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );

}
