import React, { Component } from 'react'

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    setInterval(() => this.tick(), 950);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
        <h4 className="text-white mt-2">{this.state.date.toLocaleTimeString()}</h4>
    );
  }
}

export default Clock
