import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdoptionPage from '../routes/AdoptionPage/AdoptionPage';
import LandingPage from '../routes/LandingPage/LandingPage';
import Header from '../components/Header/Header'

function Root() {
  return <div className='Root'>
    <Header/>
    <Switch>
      <Route 
        exact path="/"
        component={LandingPage}
      />
      <Route
        path={"/adopt"}
        component={AdoptionPage}
        />
    </Switch>
  </div>
}

export default Root