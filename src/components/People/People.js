import React from 'react';
import './People.css'

export default class Adopters extends React.Component {
  displayPeople = () => {
    const {people} = this.props
    if (people && people.length > 0) {
      return <ul className="adopters-list">{this.dataAdopters(people)}</ul>
    }
    return 'Everyone has adopted a pet today!'
  }
  dataPeople = (people) => {
    return people.map((people, i) => {
      return <li key={i} className="adopters-list-item">{people}</li>
    });
  }
  render() {
    return (
      <div className="Adopters">
        <h3>Adoption Line</h3>
        {this.displayPeople()}
      </div>
    );
  }
}