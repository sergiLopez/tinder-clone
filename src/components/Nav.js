import React from 'react'
import whitelogo from '../images/tinder_logo_white.png'
import colorLogo from '../images/color-logo-tinder.png'

const Nav = ({minimal, authToken, setShowModal, showModal}) => {

    const handleClick = () => {
        setShowModal(true)
    }

    return (<nav>
        <div className='logo-container'>
            <img className='logo' src={minimal ? colorLogo : whitelogo}></img>
        </div> 
        {!authToken && !minimal && <button 
            className="nav-button"
            onClick={handleClick}
            disabled={showModal}
        >Log in</button>}
    </nav>)
}
export default Nav