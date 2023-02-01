import { useRef } from 'react'
import { Link } from 'react-router-dom'

import useStatusResetGame from '../hooks/useStatusResetGame'

import './MenuBar.Component.css'

const MenuBar = () => {

    const { statusResetGame } = useStatusResetGame();

    const navRef = useRef(null)

    const openNav = () => {
        navRef.current.style.width = "100%";
    }
    const closeNav = () => {
        navRef.current.style.width = "0%";
    }

    const handleNewGame = () => {
        statusResetGame();
        closeNav();
    }

    return (
        <div className='menubar'>
            <div id="countDown" className="countDown"></div>
            <div id="connectionFeedback" className="connectionFeedback"></div>
            <nav id="mobileNav">
                <div id="mobileNavLinks" className="overlay" ref={navRef}>
                    <div className="closebtn" onClick={closeNav}>&times;</div>
                    <div className="overlay-content font-quicksand">
                        <Link to='/' onClick={closeNav}>Játék</Link>
                        <Link to='/describe' onClick={closeNav}>Leírás</Link>
                        <Link to='/' onClick={handleNewGame} > Új játék</Link>
                        <a href={process.env.REACT_APP_GITHUB_REPO_URL} onClick={closeNav}>GITHUB Repo</a>
                        <a href={process.env.REACT_APP_HOME_PAGE_URL + '/play'} onClick={closeNav}>Kilépés</a>
                    </div>
                </div>
                <span id="menu-button" onClick={openNav}>&#9776;</span>
            </nav>
        </div>
    );
}

export default MenuBar;