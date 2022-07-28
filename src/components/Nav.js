import React from 'react'
import whitelogo from '../images/tinder_logo_white.png'
import colorLogo from '../images/color-logo-tinder.png'

const Nav = ({minimal, authToken}) => {

    return (<nav>
        <div className='logo-container'>
            <img className='logo' src={minimal ? colorLogo : whitelogo}></img>
        </div> 
        {!authToken && <button className="nav-button">Log in</button>}
    </nav>)
}
export default Nav