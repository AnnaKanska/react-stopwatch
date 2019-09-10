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

  handleStart = () => {
    this.setState({
      startTime: Date.now(),
      running: true
    });
    console.log("start clicked", this.state);
  };
  handleLap = () => {
    const timeStamp = Date.now();
    let currentLap = timeStamp - this.state.startTime
    currentLap = this.getTimeAsAString(currentLap)
    this.setState({
      startTime: this.state.startTime,
      currentTime: 0,
      laps: [...this.state.laps, currentLap],
      running: false
    })
    console.log("lap clicked", this.state)
  };


  render() {
    return (
      <div className="App">
        <h1>Stopwatch</h1>
        <div>{this.getTimeAsAString(this.state.currentTime)}</div>
        <button onClick={e => this.handleStart(e)}>Start</button>
        <button onClick={e => this.handleLap(e)}>Lap</button>
        {this.state.laps.map(lap => <ul>
          <li>{lap}</li>
        </ul>)}
      </div>
    );

  }
}

export default App;
