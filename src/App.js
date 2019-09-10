import React from "react";
import "./App.css";
import { Stopwatch } from "./Stopwatch";

class App extends React.Component {
  state = {
    startTime: 0,
    currentTime: 0,
    running: false
  };

  handleStart = () => {
    this.setState({
      startTime: Date.now(),
      running: true
    });
    console.log("button clicked", this.state);
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

  render() {
    return (
      <div className="App">
        <h1>Stopwatch</h1>
        <Stopwatch
          startTime={this.state.startTime}
          running={this.state.running}
        />
        <div>{this.getTimeAsAString(Date.now())}</div>
        <button onClick={e => this.handleStart(e)}>Start</button>
      </div>
    );
  }
}

export default App;
