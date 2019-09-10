import React, { Component } from "react";

export class Stopwatch extends Component {
  render() {
    const { startTime, running, timeElapsed } = this.props;
    {
      return <div>{this.props.startTime}</div>;
    }
  }
}
