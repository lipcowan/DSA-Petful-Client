import config from '../config'

const ApiService = {

    
    adoptPet(pet) {
        fetch(`${config.REACT_APP_API_BASE}/pets`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({pet: pet})
        }).then(res => {
            if(!res){
                throw new Error('Whoops! Something went wrong... try again?')
            } else {
                return res.json()
            }
        })
    },


    addPerson(name) {
        return fetch(`${config.REACT_APP_API_BASE}/people`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(name)
        }).then(res => {
            if(!res){
                throw new Error('Whoops! Something went wrong... try again?')
            } else {
                return res
            }
        })
    },

    dropPerson() {
        return fetch(`${config.REACT_APP_API_BASE}/people`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        })
        .then(res => {
            if(!res) {
                throw new Error('Whoops! Something went wrong... try again?')
            }
        })
    }

}

export default ApiService