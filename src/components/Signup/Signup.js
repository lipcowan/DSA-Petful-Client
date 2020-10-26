import React from 'react'
import './Signup.css'

export default class Signup extends React.Component {

  render() {
    return (
      <form className='signup-form' onSubmit={(e) => this.props.handleSubmit(e)}>
        <label htmlFor='name'>Enter your name</label>
        <input type='text' id='name' onChange={(e) => this.props.handleChange(e.target)} value={this.props.name} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}