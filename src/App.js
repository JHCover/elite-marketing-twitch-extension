import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef, Image} from 'react';
import {Dots} from "react-activity";
import "react-activity/dist/library.css";
import TitleImage from "./title.png"
import SubTitleImage from "./subTitle.png"
import {SocketProvider} from './Context/SocketContext';


function App() {

    const [yesCount, setYesCount] = useState(0);
    const [noCount, setNoCount] = useState(0);
    const [spinnerOn, setSpinnerOn] = useState(false);

    const socket = useRef(null);


    // useEffect(() => {
    //     socket.current = new WebSocket('http://localhost:5000')
    //
    //     socket.current.addEventListener('open', e => {
    //         console.log('WebSocket is connected')
    //         getInitialValues()
    //         setSpinnerOn(false)
    //     })
    //     socket.current.addEventListener('close', e => console.log('WebSocket is closed'))
    //
    //     socket.current.addEventListener('error', e => console.error('WebSocket is in error', e))
    //
    //     socket.current.addEventListener('message', e => {
    //         console.log(`number of yes's: ${JSON.parse(e.data).message}`)
    //         let message = JSON.parse(e.data).message
    //         console.log(`number of yes's:`, message.yesCount)
    //         setYesCount(message.yesCount)
    //         setNoCount(message.noCount)
    //         if (spinnerOn) setSpinnerOn(false)
    //     })
    //
    //     return () => {
    //         socket.current.close();
    //         console.log("websocket closed")
    //     };
    // }, []);

    // useEffect(() => {
    //     setInterval(sendHeartbeat, 300000)
    // }, [])

    // const sendHeartbeat = () => {
    //     const payload = {
    //         action: 'message',
    //         type: 'heartbeat'
    //     }
    //     console.log("heartbeat sent")
    //     socket.current.send(JSON.stringify(payload))
    //
    // }

    const getInitialValues = async () => {
        const payload = {
            action: 'message',
            type: 'getInitialValues'
        }
        await socket.current.send(JSON.stringify(payload))
        return Promise.resolve()
    }


    return (
        <SocketProvider>
            <div className="App">
                {spinnerOn ? <Dots color="#0000FF" size={32} speed={1} animating={true}/> :
                    <div className="Border">
                        <div className="TitlesContainer">
                            <img alt="TitleImage" src={TitleImage} height={50}/>
                            <img className="SubTitle" alt="SubTitleImage" src={SubTitleImage} height={20}/>
                        </div>
                        <header className="Header">Lifetime Totals</header>
                        <p className="YesText">
                            YES: {yesCount}
                        </p>
                        <p className="NoText">
                            NO: {noCount}
                        </p>
                    </div>
                }
            </div>
        </SocketProvider>
    );
}

export default App;
