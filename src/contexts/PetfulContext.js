import React, { Component } from 'react'
import { REACT_APP_API_BASE } from '../config'

export const PetfulContext = React.createContext({
    dogsQue: null,
    catsQue: null,
    adoptCat: () => {},
    adoptDog: () => {},
    reseedQue: () => {}
})

export class PetfulProvider extends Component{
    constructor() {
        super()
        this.state = {
            catsQue: null,
            dogsQue: null
        }
    }

    componentDidMount() {
        this.catsPolling = setInterval(this.pollingCats, 5000)
        this.dogsPolling = setInterval(this.pollingDogs, 5000)
    }

    pollingCats = () => {
        fetch(`${REACT_APP_API_BASE}/cats/queue`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    catsQue: res
                })
            })
    }

    clearCatsPolling = () => {
        clearInterval(this.catsPolling)
    }

    pollingDogs = () => {
        fetch(`${REACT_APP_API_BASE}/dogs/queue`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                dogsQue: res
            })
        })
    }

    clearDogsPolling = () => {
        clearInterval(this.dogsPolling)
    }

    adoptCat = () => {
        let cQue = this.state.catsQue
        cQue[0].adopter = "Thinkful"

        this.setState({
            catsQue: cQue
        })
        fetch(`${REACT_APP_API_BASE}/cats/adopt`, {
            method: 'DELETE'
        })
            .then(res => {
                if(res.ok) {
                    console.log('Cat Adopted by Thinkful Student')
                }
            })
            .catch(err => {
                console.log('Error: ', err)
            })
    }

    adoptDog = () => {
        let dQue = this.state.dogsQue
        dQue[0].adopter = "Thinkful"

        this.setState({
            dogsQue: dQue
        })
        fetch(`${REACT_APP_API_BASE}/dogs/adopt`, {
            method: 'DELETE'
        })
            .then(res => {
                if(res.ok) {
                    console.log('Dog Adopted by Thinkful Student')
                }
            })
            .catch(err => {
                console.log('Error: ', err)
            })
    }

    render() {
        const value = {
            catsQue: this.state.catsQue,
            dogsQue: this.state.dogsQue,
            adoptCat: this.adoptCat,
            adoptDog: this.adoptDog,
            clearCatsPolling: this.clearCatsPolling,
            clearDogsPolling: this.clearDogsPolling,
            reseedQue: this.reseedQue
        }
        return (
            <PetfulContext.Provider value={value}>
                {this.props.children}
            </PetfulContext.Provider>
        )
    }

}