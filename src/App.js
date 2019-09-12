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
        });
      }
      return { status: !state.status };
    });
  };

  handleLap = () => {
    const { runningTime, prevLapTime, nextId } = this.state;
    const currentLap = {
      id: nextId,
      time: runningTime - prevLapTime,
    }

    this.setState({
      laps: [...this.state.laps, currentLap],
      nextId: this.state.nextId + 1,
      prevLapTime: runningTime,
    });
    this.getMinMax();
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, running: false, laps: [], nextId: 1 });
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

  getMinMax = () => {
    const lapsArr = this.state.laps.map(({time}) => time)
    let minLapTime = Math.min(...lapsArr);
    let maxLapTime = Math.max(...lapsArr);
    for(let i = 0; i < this.state.laps.length; i ++){
      if(lapsArr.length > 2 && this.state.laps[i].time === minLapTime){
        console.log("min - ", this.state.laps[i].id)
        this.setState({minLap: this.state.laps[i].id})
      }else if(lapsArr.length >2 && this.state.laps[i].time === maxLapTime){
        console.log("max - ", this.state.laps[i].id)
        this.setState({maxLap: this.state.laps[i].id})
    }
  }

  }

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
            {this.state.laps.slice(0).reverse().map((lap) => (
              <li key={lap.id}
              className={this.state.minLap === lap.id ? 'red' : 'listItem'}>
                <h3>Lap {lap.id}</h3>
              <h3>{this.getTimeAsAString(lap.time)}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
