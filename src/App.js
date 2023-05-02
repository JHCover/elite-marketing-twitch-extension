import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef, Image} from 'react';
import {Dots} from "react-activity";
import "react-activity/dist/library.css";
import TitleImage from "./title.png"
import SubTitleImage from "./subTitle.png"
import { io } from "socket.io-client";

const socket = io("https://elitemarketingstats.com");

function App() {

    const [pitchStats, setPitchStats] = useState({})
    const [spinnerOn, setSpinnerOn] = useState()


    useEffect(() => {
        // receive initial data load
        socket.on("initial", (stats) => {
            console.log("initialStats", stats)
            setPitchStats(stats[0])
        });
        // receive a broadcast update
        socket.on("statsUpdate", (update) => {
            setPitchStats(update)
        })
    }, [])


    return (
            <div className="App">
                {spinnerOn ? <Dots color="#0000FF" size={32} speed={1} animating={true}/> :
                    <div className="Border">
                        <div className="TitlesContainer">
                            <img alt="TitleImage" src={TitleImage} height={50}/>
                            <img className="SubTitle" alt="SubTitleImage" src={SubTitleImage} height={20}/>
                        </div>
                        <header className="Header">Lifetime Totals</header>
                        <p className="YesText">
                            YES: {pitchStats.yesCount}
                        </p>
                        <p className="NoText">
                            NO: {pitchStats.noCount}
                        </p>
                    </div>
                }
            </div>
    );
}

export default App;
