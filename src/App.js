import React from "react";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Stopwatch />
      </div>
    );
  }
}

class Stopwatch extends React.Component {
  state = {
    status: false,
    runningTime: 0,
    laps: []
  };

  handleStartStop = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({
            runningTime: Date.now() - startTime
          });
        });
      }
      return { status: !state.status };
    });
    console.log("start/stop clicked", this.runningTime);
  };

  handleLap = () => {
    const timeStamp = Date.now();
    const startTime = Date.now() - this.state.runningTime;
    let currentLap = 0;
    let prevLap = this.state.laps[this.state.laps.length - 1];
    if (this.state.laps.length < 1) {
      currentLap = timeStamp - startTime;
    } else {
      currentLap = timeStamp - startTime - prevLap;
    }

    this.setState({
      laps: [...this.state.laps, this.getTimeAsAString(currentLap)],
      currentTime: this.timeStamp - this.startTime
    });
    console.log("this.state.runningTime", this.state.runningTime);
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, running: false });
    console.log("reset clicked");
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
    const { status, runningTime } = this.state;
    return (
      <div>
        <h2>{this.getTimeAsAString(runningTime)}</h2>
        <button className="btn startStopBtn" onClick={this.handleStartStop}>
          {status ? "Stop" : "Start"}
        </button>
        <button className="btn lapBtn" onClick={this.handleLap}>
          Lap
        </button>
        <button className="btn resetBtn" onClick={this.handleReset}>
          Reset
        </button>
        <div className="lapContainer">
          <ul>
            {this.state.laps.map((lap, i) => (
              <li key={i}>{lap}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
