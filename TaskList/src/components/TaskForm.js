import React, { Component } from 'react'

class TaskForm extends Component {
  static initialState = {
        title: '',
        responsible: '',
        description: '',
        priority: 'low'
    }
  constructor(){
    super()
    this.state = TaskForm.initialState
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetBuilder = this.resetBuilder.bind(this)
  }

  handleInput(e){
    //Js desconstruction, e.target.value, and e.target.name is equal
    const { value, name} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onAddTask(this.state)
	this.setState({priority: 'low'})
  }

  resetBuilder() {
    document.getElementById("form").reset()
    document.getElementById("title").focus()
  }

  render(){
    return(
      <div className="card">
        <form id="form" className="card-body" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              id = "title"
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              onChange={this.handleInput}
            />
          </div>
          <div className="form-group">
              <input
                type="text"
                name="responsible"
                className="form-control"
                placeholder="Responsible"
                onChange={this.handleInput}
              />
          </div>
          <div className="form-group">
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Description"
                onChange={this.handleInput}
              />
          </div>
          <div className="form-group">
              <select
				id = "select-form"
                name="priority"
                className="form-control"
                onChange={this.handleInput}
              >
              <option>low</option>
              <option>medium</option>
              <option>high</option>
              </select>
          </div>
          <button type="submit" onClick={this.resetBuilder} className="btn btn-sm btn-primary">Add new one</button>
        </form>
      </div>
    )
  }
}

export default TaskForm
