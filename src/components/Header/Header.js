import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className='Header_Container'>
                <img src='https://github.com/lipcowan/DSA-Petful-Client/blob/main/public/favicon.png?raw=true' alt='cat icon'/>
                <h1>Petful</h1>
            </header>
        )
    }

}

export default Header