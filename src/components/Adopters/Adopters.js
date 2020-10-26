import React from 'react';
import './Adopters.css'

export default class Adopters extends React.Component {
  displayAdopters = () => {
    const {adopters} = this.props
    if (adopters && adopters.length > 0) {
      return <ul className="adopters-list">{this.dataAdopters(adopters)}</ul>
    }
    return 'Everyone has adopted a pet today!'
  }
  dataAdopters = (adopters) => {
    return adopters.map((adopter, i) => {
      return <li key={i} className="adopters-list-item">{adopter}</li>
    });
  }
  render() {
    return (
      <div className="Adopters">
        {this.displayAdopters()}
      </div>
    );
  }
}