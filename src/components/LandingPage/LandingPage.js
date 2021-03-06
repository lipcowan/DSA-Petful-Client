import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

class Landed extends Component {
    render() {
        return (
            <div className="Landing_Page">
                <div className="Landing_Page_Photo_Container">
                    <img src='https://github.com/lipcowan/DSA-Petful-Client/blob/main/src/components/LandingPage/landingPageCat.jpg?raw=true' alt='cat peeking around door'/>
                        <div className="Landing_Page_Summary">
                            <h3>Rehoming Pets is what we're here for</h3>
                            <p>If you're looking for a new pet then you're in the right spot. 
                                When you're ready to sign up to adopt please click on the 
                                adoption link below. Once you're signed in you'll see all 
                                the other animals being rehomed with other humans ahead of you in line.
                                Once you're up, please select from the available dog or cat. Once you've 
                                selected you pet you'll receive a confirmation alert - we'll follow-up with
                                the next steps later.
                            </p>
                            <Link to="/adopt">I'm ready to adopt!</Link>
                        </div>
                    <img src='https://github.com/lipcowan/DSA-Petful-Client/blob/main/src/components/LandingPage/landingPageDog.jpg?raw=true' alt='dog smiling'/>
                </div>
                
            </div>
        )
    }
}

export default Landed