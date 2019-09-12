import React from "react";
import "./App.css";
import { tsImportEqualsDeclaration } from "@babel/types";

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

//   getMinMax = () => {
//     const lapsArr = this.state.laps.map(({time}) => time)
//     let minLapTime = Math.min(...lapsArr);
//     let maxLapTime = Math.max(...lapsArr);
//     for(let i = 0; i < this.state.laps.length; i ++){
//       if(lapsArr.length > 1 && this.state.laps[i].time === minLapTime){
//         this.setState(state => {
//           return { minLap: state.laps[i].id }
//         }, () => console.log(this.state));
//       }else if(lapsArr.length > 1 && this.state.laps[i].time === maxLapTime){
//         this.setState({maxLap: this.state.laps[i].id})
//     }
//   }
// }

  render() {
    const { status, runningTime, laps, minLap, maxLap } = this.state;
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
            {laps.map((lap) => (
              <li key={lap.id} style={{color: lap.id === minLap ? 'green' 
                : lap.id === maxLap ? 'red' 
                : lap.id === minLap && lap.id === maxLap ? 'black' 
                : 'black'
            }}>
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
