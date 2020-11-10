import React from 'react'
import './Pets.css'

export default class Pets extends React.Component {
    
    displayNextCat = () => {
        const {cat} = this.props.pets;
        if (cat !== undefined) {
            return this.petData(cat[0])
        } else {
            return 'All cats have been adopted... please comeback later'
        }
    }
    
    
    displayNextDog = () => {
        const {dog} = this.props.pets;
        if (dog !== undefined) {
            return this.petData(dog[0])
        }else {
            return 'All dogs have been adopted... please comeback later'
        }
    }


    petData = (pet) => {
    return <div className='pet-container'>
             <h3>{pet.name}</h3>
            <img src={pet.imageURL} alt={pet.description} />
            <div className="pet-stats">
                <p>Age: {pet.age}</p>
                <p>Gender: {pet.gender}</p>
                <p>Breed: {pet.breed}</p>
                <p>Description: {pet.description}</p>
                <p>Why they are here: {pet.story}</p>
            </div>    
        </div>
    }

    render() {
        return (
            <div className="Pets">
                {this.displayNextCat()}
                {this.displayNextDog()}
            </div>
        )
    }
}