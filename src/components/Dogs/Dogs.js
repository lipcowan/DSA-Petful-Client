import React, {Component} from 'react';
import {PetfulContext} from '../../contexts/PetfulContext';
import Que from '../Que/Que';
import '../Pets.css';

export default class Dogs extends Component {
    state = {
        index: 0,
        length: (this.context.dogsQue!==null)?this.context.dogsQue.length:1
    }

    static contextType = PetfulContext;

    componentDidUpdate(preProps, preState) {
        if(this.context.dogsQue !== null){
            if(preState.length !== this.context.dogsQue.length){
                this.setState({
                    index: 0,
                    length: this.context.dogsQue.length
                })
            }
            if(this.context.dogsQue.length === 0) {
                this.context.clearDogsPolling()
            }
        }
    }

    moveLeft = () => {
        if(this.state.index > 0){
            this.setState({
                index: this.state.index - 1
            })
        }
    }

    moveRight = () => {
        if(this.state.index < this.context.dogsQue.length - 1) {
            this.setState({
                index: this.state.index + 1
            })
        }
    }

    render() {
        if(this.context.dogsQue === null) {
            return (
                <h2> Loading available dogs ...</h2>
            )
        } else if(!this.context.dogsQue.length) {
            return (
                <div className="allGone">
                    <h2>We're sorry, all dog's have been adopted</h2>
                    <h3>Please check back again tomorrow - thanks!</h3>
                </div>
            )
        } else {
            const props = this.context.dogsQue[this.state.index];
            return (
                <section className="pet">
                    <header>
                        <h2 className="pet-name">
                            <i className="left" onClick={this.moveLeft}/>
                            {props.name}
                            <i className="right" onClick={this.moveRight}/>
                            <img src={props.imageURL} alt={props.imageDescription} />
                        </h2>
                    </header>
                    <main>
                        <h3> More info about {props.name}</h3>
                        <dl className="pet-specifics">
                            <dt className="term-sex">Sex</dt>
                            <dd className="def-sex">{props.sex}</dd>
                            <dt className="term-age">Age</dt>
                            <dd className="def-age">{props.age}</dd>
                            <dt className="term-breed">Breed</dt>
                            <dd className="def-breed">{props.breed}</dd>
                            <dt className="term-story">Backstory</dt>
                            <dd className="def-story">{props.story}</dd>
                        </dl>
                        <button
                            className="adopter"
                            type="button"
                            disabled={(props.adopter?true:false) || (this.context.catsQue[0].adopter===null?false:true)}
                            onClick={() => this.context.adoptCat()}
                        >
                        {
                            (props.adopter)?`Adoption currently in process with ${props.adopter}`:`Let's Re-Home ${props.name}`
                        }
                        </button>    
                    </main>
                    <Que que={this.context.dogsQue}/>
                </section>
            )
        }
    }
}
