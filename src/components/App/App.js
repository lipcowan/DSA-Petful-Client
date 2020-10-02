import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import AdoptionPage from '../../routes/AdoptionPage/AdoptionPage'
import LandingPage from '../../routes/LandingPage/LandingPage'

class App extends Component {
  render() {
    return (
      <div className= "App">
        <main>
          <BrowserRouter>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path="/adoption" component={AdoptionPage}/>
          </BrowserRouter>
        </main>
      </div>   
    ) 
  }

}

export default App