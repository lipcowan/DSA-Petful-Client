import React, { Component } from 'react'

export default class LandingPage extends Component {
    render() {
        return (
            <div className="landing">
                <h1>Welcome to Petful</h1>
                <p></p>
                <button 
                    className="start" 
                    onClick={() => {
                        this.props.history.push('/adoption')
                    }}
                >
                    DO THE THING ZHU LI!
                </button>
            </div>
        )
    }

}