import React, { Component } from 'react'
import Pets from '../../components/Pets/Pets'
import Adopters from '../../components/Adopters/Adopters'
import Signup from '../../components/Signup/Signup'
import AdoptPetBtn from '../../components/AdoptPetBtn/AdoptPetBtn'
import YourNewPet from '../../components/YourNewPet/YourNewPet'
import ApiService from '../../Services/ApiService'
import config from '../../config'

export default class AdoptionPage extends Component{
    state={
        pets: {},
        adopters: [],
        name: '',
        adopted: ''
    }

    componentDidMount = () => {
        this.getAdopters();
        this.getPets();
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.value
        })
    }

    handleNameSubmit = (e) => {
        e.preventDefault()
        ApiService.addPerson(this.state.name)
        .then(res => {
            window.localStorage.setItem('petful_username', res)
            this.setState({
                adopters: [...this.state.adopters, res],
                name: ''
            })
        })
        ApiService.dropPerson()
    }

    getAdopters = () => {
        fetch(`${config.REACT_APP_API_BASE}/people`)
        .then(res => {
            return res.json();
          }).then(resJson => {
            this.setState({
              adopters: resJson
            })
          })
        console.log(this.state.adopters)
    }

    getPets = () => {
        fetch(`${config.REACT_APP_API_BASE}/pets`)
          .then(res => {
            return res.json();
          }).then(resJson => {
            this.setState({
              pets: resJson
            })
          })
    }

    adoptCat = () => {
        this.setState({
            adopted: 'cat'
        })
    }

    adoptDog = () => {
        this.setState({
            adopted: 'dog'
        })
    }

    processAdoptions = () => {
        const earlierAdopterPool = ['Cleopatra', 'Aphrodite', 'Harry Potter', 'Ron Weasley']
        setInterval(() => {
            if((window.localStorage.getItem('petful_username') !== this.state.adopters[0]) && this.state.adopters.length > 0) {
                let petTypePicker = ['cats', 'dogs'][Math.floor(Math.random()* 2)]
                    Promise.all([ApiService.adoptPet(petTypePicker), ApiService.dropPerson()])
                      .then(() => {
                          if (petTypePicker === 'cats') {
                              this.setState({
                                  pets: {
                                      cat: [...this.state.pets.cat.slice(1)],
                                      dog: [...this.state.pets.dog]
                                  },
                                  adopters: this.state.adopters.slice(1)
                              })
                          }else {
                            this.setState({
                                pets: {
                                    cat: [...this.state.pets.cat],
                                    dog: [...this.state.pets.dog.slice(1)]
                                },
                                adopters: this.state.adopters.slice(1)
                            })
                          }
                      })
                      .catch(e => console.log(e))
            } else if (this.state.adopters.length < 5) {
                let luckyAdopter = earlierAdopterPool[Math.floor((Math.random()* 4))]
                ApiService.addPerson(luckyAdopter)
                  .then(() => {
                      this.setState({
                          adopters: [...this.state.adopters, luckyAdopter]
                      })
                  }).catch(e => console.log(e))
            }
        }, 5000)
    }

    closeConfirmation = (pet) => {
        if(pet === 'cat') {
            this.setState({
              adopted: '',
              pets: {
                cat: [...this.state.pets.cat.slice(1)],
                dog: [...this.state.pets.dog]
              },
              adopters: this.state.adopters.slice(1)
            })
        } else {
            this.setState({
                adopted: '',
                pets: {
                  cat: [...this.state.pets.cat],
                  dog: [...this.state.pets.dog.slice(1)]
                },
                adopters: this.state.adopters.slice(1)
              })
        } 
    }
    
 
    render() {
        const {adopters, pets, adopted} = this.state
        return (
            <div className="adoptionPageContainer">
                <div className="availablePetsContainer">
                    <Pets pets={pets} />
                    {window.localStorage.getItem('petful_username') === this.state.adopters[0]
                        && <AdoptPetBtn
                            adoptCat={this.adoptCat}
                            adoptDog={this.adoptDog}
                        />}
                </div>
                <div className="signupContainer">
                    <Signup name={this.state.name} handleSubmit={this.handleNameSubmit} handleChange={this.handleNameChange}/>
                    {adopted
                        && <YourNewPet
                            petType={adopted}
                            handleClose={this.closeConfirmation}
                        />}
                </div>
                <div className="adopterListContainer">
                    <Adopters adopters={adopters}/>
                </div>
            </div>
            
        )
    }
}

//Can see pets for adoption FIRST ONES AVAILABLE(cat/dog)
//timer of 5 seconds dequeue and enqueue


//Can add name to list


//Can see list of people, timer of 5 seconds dequeue and enqueue UNTIL AT FRONT
//when at front, add user at end every 5 seconds UNTIL 5 TOTAL


//Conditional "Adopt" button, only see if 1st in line


//After adopt button pressed, confirmation that u adopted, name removed, pet removed