import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { tasks } from './tasks.json';
import Clock from './components/Timer';

class App extends Component {
  constructor(){
    //Inherit all react functionality (needed)
    super();
    this.state = {
      tasks
    }
  }

  selectPriorityColor(value){
    if(value === "high")
      return <span className="badge badge-pill badge-danger">{value}</span>
    if(value === "medium")
      return <span className="badge badge-pill badge-info">{value}</span>
    if(value === "low")
      return <span className="badge badge-pill badge-success">{value}</span>
  }

  render() {
    const tasks = this.state.tasks.map((task) =>{
      const colorSelected = this.selectPriorityColor(task.priority);
      return(
        <div className="col-md-4">
          <div className="card mt-4">
            <div className="card-header">
              <h3>{task.title.replace(task.title.charAt(0), task.title.charAt(0).toUpperCase())}</h3>
              {colorSelected}
            </div>
            <div className="card-body">
              <p>{task.description.replace(task.description.charAt(0), task.description.charAt(0).toUpperCase())}</p>
              <p><mark>- {task.responsible}</mark></p>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <button type="button" className="btn btn-dark">
            Tasks <span className="badge badge-pill badge-light ml-1">{this.state.tasks.length}</span>
          </button>
          <Clock className="pull-right"/>
        </nav>
        <img src={logo} className="App-logo" alt="logo"/>
        <div className="container">
          <div className="row mt-4">
            {tasks}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
