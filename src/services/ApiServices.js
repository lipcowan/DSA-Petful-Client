import config from '../config'

const ApiServices = {
    getPets() {
        return fetch(`${config.API_ENDPOINT}/pets`, {
            method: 'GET',
            headers: {"content-type": "application/json"}
        }).then(res => {
            if(!res) {
                throw new Error('Whoops! Something went wrong... try again?')
            } else {
                return res.json()
            }
        })
    },

    getPeople() {
        return fetch(`${config.API_ENDPOINT}/people`, {
            method: 'GET',
            headers: {"content-type": "application/json"}
        }).then(res => {
            if(!res) {
                throw new Error('Whoops! Something went wrong... try again?')
            } else {
                return res.json()
            }
        })
    },

    delete(type) {
        return fetch(`${config.API_ENDPOINT}/pets`, {
            method: 'DELETE',
            headers: {"content-type": "application/json"},
            body:JSON.stringify({type:type})
        }).then(res => {
            if(!res){
                throw new Error('Whoops! Something went wrong... try again?')
            } else {
                return res.json()
            }
        })
    },

    addPerson(person) {
        return fetch(`${config.API_ENDPOINT}/people`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({person:person})
        }).then(res => {
            if(!res){
                throw new Error('Whoops! Something went wrong... try again?')
            } else {
                return res.json()
            }
        })
    },
}

export default ApiServices;