import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef, Image} from 'react';
import {Dots} from "react-activity";
import "react-activity/dist/library.css";
import TitleImage from "./title.png"
import SubTitleImage from "./subTitle.png"
import {io} from "socket.io-client";

const socket = io("https://elitemarketingstats.com");

function App() {

    const [pitchStats, setPitchStats] = useState({})
    const [spinnerOn, setSpinnerOn] = useState(true)


    useEffect(() => {
        // receive initial data load
        socket.on("initial", (stats) => {
            console.log("initialStats", stats)
            setPitchStats(stats[0])
            setSpinnerOn(false)
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
                        <div>
                            {socket.connected ?
                                <div className="blob blue"></div> :
                                <div className="blob red"></div>
                            } <img alt="TitleImage" src={TitleImage} className="MainLogo"/>
                        </div>
                        <img className="SubTitle" alt="SubTitleImage" src={SubTitleImage} height={30}/>
                    </div>
                    <div className="StatsWrapper">
                        <header className="Header">All-time</header>
                        <text className="YesText">
                            Yes: {pitchStats.yesCount}
                        </text>
                        <text className="NoText">
                            No: {pitchStats.noCount}
                        </text>
                        {pitchStats.displayGoal ?
                            <text
                                className="GoalText">Goal: {pitchStats && pitchStats.streamGoalProgress} / {pitchStats && pitchStats.streamGoal}</text>
                            :
                            <></>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default App;
