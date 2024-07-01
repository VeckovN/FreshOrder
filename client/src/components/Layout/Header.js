import React, {useState, useContext, useEffect} from 'react';
import {Link as ScrollLink} from 'react-scroll';
import {NavLink, useNavigate, useLocation, } from 'react-router-dom'

import HeaderCartButton from './HeaderCartButton';

import authContext from '../../store/auth-context'
import notificationContext from '../../store/notification-context.js'
import modalContext from '../../store/modal-context.js';

import './Header.css'

const Header = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const {user, dispatchAction} = useContext(authContext);
    const {addSuccess} = useContext(notificationContext)
    const {showLogin, showRegister} = useContext(modalContext);
    const nav = useNavigate();
    const location = useLocation();


    //disable body scrolling when the nav bar is showned
    const handleOverflow = () =>{
        document.body.style.overflow = showNavbar ? 'hidden' : 'visible';
    }
    useEffect( ()=>{
        handleOverflow();
        return () =>{
            document.body.style.overflow = 'visible';
        }
    },[showNavbar])

    const logoutHandler =()=>{
        dispatchAction({type:"LOGOUT"});
        nav('/');
        addSuccess('You have logged out')
        setShowNavbar(false); 
    }

    const handleShowNavbar = () =>{
        setShowNavbar(!showNavbar)
    }
    const closeShowNavbar = () =>{
        setShowNavbar(false);
    }

    const handleRegisterModal = () =>{
        showRegister();
        if(showNavbar)
            setShowNavbar(false)
    }

    const handleLoginModal = () =>{
        showLogin();     
        if(showNavbar)
            setShowNavbar(false);
    }

    const isAdmin = user ? user.isAdmin : false;

    return (
        <header className={`header ${showNavbar ?`nav` : ''}` }>

            <div className='menuSelect' onClick={handleShowNavbar}>
                Menu
            </div>
            {!showNavbar &&
            <div className='logo'>
                <h3><NavLink  className='logoLink' to='/'>FreshOrder</NavLink></h3>
            </div>
            }
                <ul className={`links ${showNavbar ? 'nav' : ''} `} >
                    {isAdmin ?
                    <>
                        <li>
                            <NavLink 
                                to='/' 
                                onClick={closeShowNavbar} 
                                className={({ isActive }) => { return isActive ? "activeLink" : "";}}
                            >
                            Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to='/products'
                                onClick={closeShowNavbar} 
                                className={({ isActive }) => { return isActive ? "activeLink" : "";}}
                            >Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to='/users'
                                onClick={closeShowNavbar} 
                                className={({ isActive }) => { return isActive ? "activeLink" : "";}}
                            >Users
                            </NavLink>
                        </li>
                        <li className='link logout' onClick={logoutHandler}>Logout</li>
                    </>
                    :
                    <> 
                        {/* show only on / index page */}
                        {location.pathname == '/' && 
                        <>
                            <li><ScrollLink className='activeLink' onClick={closeShowNavbar} href='#welcome' to='welcome' spy={true} offset={-100} smooth={true}>Welcome</ScrollLink></li>                
                            <li><ScrollLink className='activeLink' onClick={closeShowNavbar} href='#category' activeClass='active' to='category' spy={true} offset={-100} smooth={true}>Menu</ScrollLink></li>
                            <li><ScrollLink  className='activeLink' onClick={closeShowNavbar} href='#aboutUs' activeClass='active' to='aboutUs' offset={-100} spy={true} smooth={true}>AboutUs</ScrollLink></li>     
                        </>
                        }

                        {/* when user isn't admin but it't authenticated*/}
                        {user &&
                        <>
                            {location.pathname != '/' && 
                                <li><NavLink className='link' onClick={closeShowNavbar} to='/'>Home</NavLink></li>
                            }
                            <li>
                                <NavLink 
                                    to='/orders'
                                    onClick={closeShowNavbar} 
                                    className={({ isActive }) => { return isActive ? "activeLink" : "";}}
                                >Orders
                                </NavLink>
                            </li>
                            <li><NavLink onClick={closeShowNavbar} to='/profile'>Profile</NavLink></li>
                            <li className='link logout' onClick={logoutHandler}>Logout</li>
                        </>
                        }
                    </>
                    }
            
                    {!user &&
                    <>
                        <li className='active-list' onClick={handleRegisterModal}> Register</li>
                        <li className='active-list' onClick={handleLoginModal}>Login</li>
                    </>
                    }

                </ul>

            {!isAdmin && !showNavbar &&
            <div className='cartIcon'>
                <HeaderCartButton />
            </div> 
            }

        </header>
    )
}

export default Header;

