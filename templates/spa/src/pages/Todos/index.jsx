import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.scss'

@connect(state => ({ todos: state.todos }))
class Todos extends Component {
  state = { value: '' }

  inputRef = React.createRef()

  handleInputChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    if (this.state.value) {
      this.props.dispatch.todos.add(this.state.value)
      this.setState({ value: '' })
      this.inputRef.current.blur()
    }
  }

  handleDeleteClick = id => {
    return () => {
      this.props.dispatch.todos.del(id)
    }
  }

  handleDoneClick = id => {
    return event => {
      this.props.dispatch.todos.done({ id, checked: event.target.checked })
    }
  }

  renderItems = () => {
    const todos = this.props.todos

    const items = todos.map(todo => {
      const { id, content, done } = todo
      return (
        <li key={id}>
          <input
            type='checkbox'
            checked={done}
            onClick={this.handleDoneClick(id)}
          />
          {
            done ? (
              <del className='todos-content'>{ content }</del>
            ) : (
              <span className='todos-content'>{ content }</span>
            )
          }
          <span
            className='todos-delete'
            onClick={this.handleDeleteClick(id)}
          >×</span>
        </li>
      )
    })

    return todos.length ? (
      <ul className='todos-list'>
        { items }
      </ul>
    ) : null
  }

  render () {
    return (
      <div className='todos'>
        <h1 className='todos-title'>Todo.</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={this.inputRef}
            className='todos-input'
            value={this.state.value}
            onChange={this.handleInputChange}
          />
        </form>
        { this.renderItems() }
      </div>
    )
  }
}

export default Todos
