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
    prevLapTime: 0,
    nextId: 1,
    laps: [],
    minLap: null,
    maxLap: null
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
        }, 10);
      }
      return { status: !state.status };
    });
  };

  handleLap = () => {
    const { runningTime, prevLapTime, nextId, laps } = this.state;
    const currentLap = {
      id: nextId,
      time: runningTime - prevLapTime,
    }
    
    let newArr = [currentLap, ...laps]
    let sorted = [...newArr].sort((a, b) => a.time - b.time);

    let newMinlap = sorted[0].id;
    let newMaxlap = sorted[sorted.length -1].id

    this.setState({
      laps: [currentLap, ...this.state.laps],
      nextId: this.state.nextId + 1,
      prevLapTime: runningTime,
      minLap: newMinlap,
      maxLap: newMaxlap
    });
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, prevLapTime: 0, running: false, laps: [], nextId: 1 });
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
    const { status, runningTime, laps, minLap, maxLap } = this.state;
    return (
      <div>
        <div className="timerContainer">
          <h2 className="timer">{this.getTimeAsAString(runningTime)}</h2>
          <div className="btnContainer">
            <button className={status ? 'stopTimer' : 'startTimer'} onClick={this.handleStartStop}>
              {status ? "Stop" : "Start"}
            </button>
            <button disabled={!status} className="btn lapBtn" onClick={this.handleLap} style={{display: !status && (laps.length > 0) ? 'none' : 'flex'}}>
              Lap
            </button>
            <button className="btn resetBtn" onClick={this.handleReset} style={{display: !status && (laps.length > 0) ? 'flex' : 'none'}}>
              Reset
            </button>
          </div>
        </div>
        <div className="lapContainer">
          <ul>
            <li className="currentLap" style={{display: runningTime ? 'flex' : 'none' }}>
            <h3 className="lapNo">Lap {laps.length + 1}</h3>
              <h3 className="lapStopTime">{this.getTimeAsAString(runningTime)}</h3>
            </li>
            {laps.map((lap) => (
              <li key={lap.id} style={{color: (laps.length <= 1) ? 'white'
                : lap.id === minLap ? 'green' 
                : lap.id === maxLap ? 'red'
                : 'white'
            }}>
              <h3 className="lapNo">Lap {lap.id}</h3>
              <h3 className="lapStopTime">{this.getTimeAsAString(lap.time)}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
