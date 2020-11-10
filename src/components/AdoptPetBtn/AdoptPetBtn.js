import React from 'react';

export default class AdoptPetBtn extends React.Component {
  render() {
    return (
      <div className="Adopt-Buttons">
        <button className="adopt-cat" onClick={this.props.adoptCat}>Adopt Cat</button>
        <button className="adopt-dog" onClick={this.props.adoptDog}>Adopt Dog</button>
        <button className="adopt-both" onClick={this.props.adoptBoth}>Adopt Both!</button>
      </div>
    )
  }
}