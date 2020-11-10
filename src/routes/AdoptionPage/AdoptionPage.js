import React, { Component } from 'react'
import Pets from '../../components/Pets/Pets'
import People from '../../components/People/People'
import Signup from '../../components/Signup/Signup'
import AdoptPetBtn from '../../components/AdoptPetBtn/AdoptPetBtn'
import YourNewPet from '../../components/YourNewPet/YourNewPet'
import ApiServices from '../../services/ApiServices'
import config from '../../config'
import './AdoptionPage.css'

export default class AdoptionPage extends Component {
    state = {
        pets: {},
        people: [],
        name: '',
        adopted: ''
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.value
        })
    }

    handleNameSubmit = (e) => {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/people`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name: this.state.name })
        })
            .then(res => res.json())
            .then(resJson => {
                window.localStorage.setItem('petful_username', resJson)
                this.setState({
                    people: [...this.state.people, resJson],
                    name: ''
                })
            })
        this.processAdoptions()
    }

    componentDidMount = () => {
        this.getPeople();
        this.getPets();
    }

    getPeople = () => {
        fetch(`${config.API_ENDPOINT}/people`)
            .then(res => {
                return res.json();
            })
            .then(resJson => {
                this.setState({
                    people: resJson
                })
            })

    }

    getPets = () => {
        fetch(`${config.API_ENDPOINT}/pets`)
            .then(res => {
                return res.json();
            })
            .then(resJson => {
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

    adoptBoth = () => {
        this.setState({
            adopted: 'cat and dog'
        })
    }

    dequeueAnimal = (pet) => {
        fetch(`${config.API_ENDPOINT}/pets`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    pet
                })
            })
            .then(res => {
                if (!res) {
                    throw new Error('Something went wrong, try again')
                }
            })
    }

    dequeuePerson = () => {
        fetch(`${config.API_ENDPOINT}/people`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                if (!res) {
                    throw new Error('Something went wrong, try again')
                }
            })
    }

    processAdoptions = () => {
        const randomPeople = [
            'Cleopatra',
            'Aphrodite',
            'Harry Potter',
            'Ron Weasley'
        ]
        setInterval(() => {
            if ((window.localStorage.getItem('petful_username') !== this.state.people[0]) && this.state.people.length > 0) {
                let randomPetType = ['cats', 'dogs'][Math.floor(Math.random() * 2)]
                Promise.all([ApiServices.adoptPet(randomPetType), ApiServices.dropPerson()])
                    .then(() => {
                        if (randomPetType === 'cats') {
                            this.setState({
                                pets: {
                                    cat: [...this.state.pets.cat.slice(1)],
                                    dog: [...this.state.pets.dog]
                                },
                                people: this.state.people.slice(1)
                            })
                        } else if (randomPetType === 'dogs') {
                            this.setState({
                                pets: {
                                    cat: [...this.state.pets.cat],
                                    dog: [...this.state.pets.dog.slice(1)]
                                },
                                people: this.state.people.slice(1)
                            })
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else if (this.state.people.length < 5) {
                let randomPerson = randomPeople[Math.floor((Math.random() * 4))]

                ApiServices.addPerson(randomPerson)
                    .then(() => {
                        this.setState({
                            people: [...this.state.people, randomPerson]
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        }, 5000)
    }

    closeConfirmation = (pet) => {
        if (pet === 'cat and dog') {
            this.dequeueAnimal('cats')
            this.dequeueAnimal('dogs')
        } else {
            let plural = pet + 's'
            this.dequeueAnimal(plural)
        }
        this.dequeuePerson()

        if (pet === 'cat') {
            this.setState({
                adopted: '',
                pets: {
                    cat: [...this.state.pets.cat.slice(1)],
                    dog: [...this.state.pets.dog]
                },
                people: this.state.people.slice(1)
            })
        } else if (pet === 'dog') {
            this.setState({
                adopted: '',
                pets: {
                    cat: [...this.state.pets.cat],
                    dog: [...this.state.pets.dog.slice(1)]
                },
                people: this.state.people.slice(1)
            })
        } else if (pet === 'cat and dog') {
            this.setState({
                adopted: '',
                pets: {
                    cat: [...this.state.pets.cat.slice(1)],
                    dog: [...this.state.pets.dog.slice(1)]
                },
                people: this.state.people.slice(1)
            })
        }
    }


    render() {
        const { people, pets, adopted } = this.state
        return (
            <div className="adoptionPageContainer">
                <div className="adopterListContainer">
                    <People people={people} />
                    <Signup name={this.state.name} handleSubmit={this.handleNameSubmit} handleChange={this.handleNameChange} />
                    {adopted
                        && <YourNewPet
                            petType={adopted}
                            handleClose={this.closeConfirmation}
                        />}
                    {window.localStorage.getItem('petful_username') === this.state.people[0]
                        && <AdoptPetBtn
                            adoptCat={this.adoptCat}
                            adoptDog={this.adoptDog}
                        />}
                </div>
                <div className="availablePetsContainer">
                    <Pets pets={pets} />
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