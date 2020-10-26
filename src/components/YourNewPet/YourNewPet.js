import React from 'react'

export default class YourNewPet extends React.Component {
  render() {
    const {petType, handleClose} = this.props
    return (
      <div className='confirmation_box'>
        <h3>Congrats!</h3>
        <p>We'll be in touch soon with the next steps for the adoption process. Don't worry you'll get to enjoy the company of your new {petType} soon!</p>
        <button onClick={() => handleClose(petType)}>Close</button>
      </div>
    )
  }
}