import React from "react";
import "./App.css";
import { Stopwatch } from "./Stopwatch";

class App extends React.Component {
  state = {
    startTime: 0,
    currentTime: 0,
    laps: [],
    running: false
  };

  getTimeAsAString = time => {
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    return `${minutes}:${seconds}.${milliseconds}`;
  };

   getTime = () => {
    const timeStamp = Date.now();
    const time = timeStamp - this.state.startTime;
    return setInterval(() => {
      this.setState({
        currentTime: this.getTimeAsAString(time)
      })
    }, 100);
  }

  handleStart = () => {
    this.getTime();
    this.setState({
      startTime: Date.now(),
      running: true
    });
    console.log("Start clicked", this.state)
  };

  handleLap = () => {
    const timeStamp = Date.now();
    let currentLap = timeStamp - this.state.startTime
    currentLap = this.getTimeAsAString(currentLap)
    this.setState({
      startTime: this.state.startTime,
      currentTime: 0,
      laps: [...this.state.laps, currentLap],
    })
    console.log("lap clicked", this.state)
  };
  handleStop = () => {
    this.setState({
      running: false
    })
    console.log("stop clicked", this.state)
  }



  render() {
    return (
      <div className="App">
        <h1>Stopwatch</h1>
        <div>{this.state.currentTime}</div>
        <div className="btnContainer">
          <button className="btn startBtn" onClick={e => this.handleStart(e)}>Start</button>
          <button disabled={!this.state.running} className="btn lapBtn"onClick={e => this.handleLap(e)}>Lap</button>
          <button className="btn stopBtn" onClick={e => this.handleStop(e)}>Stop</button>
          <button className="btn resetBtn" onClick={e => this.handleReset(e)}>Reset</button>
        </div>
        <div className="lapContainer">
        <ul>{this.state.laps.map((lap, i) => 
          <li key={i}>{lap}</li>
        )}
        </ul>
        </div>
      </div>
    );

  }
}

export default App;
