import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import { PetfulProvider } from './contexts/PetfulContext'

ReactDOM.render(
    <PetfulProvider>
        <App />
    </PetfulProvider>, 
    document.getElementById('root'));
