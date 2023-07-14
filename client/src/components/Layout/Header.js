import React, {Fragment, useRef,useState, useContext} from 'react'
import {Link as ScrollLink} from 'react-scroll';
import {Link, useNavigate, useLocation} from 'react-router-dom'

import './Header.css'
import HeaderCartButton from './HeaderCartButton';

import authContext from '../Store/auth-context'
import notificationContext from '../Store/notification-context.js'

//React.memo won't work when is modal clicked because Header props are showModal state
const Header = props => {
    const [showNavbar, setShowNavbar] = useState(false);
    const {user, dispatchAction} = useContext(authContext);
    const {addSuccess} = useContext(notificationContext)
    const nav = useNavigate();
    const location = useLocation();

    //TEST THIS
    const logoutHandler =()=>{
        dispatchAction({type:"LOGOUT"});
        nav('/'); //nav to '/' route
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
        props.onShowRegisterModal()
        if(showNavbar)
            setShowNavbar(false)
    }

    const handleLoginModal = () =>{
        props.onShowLoginModal()
        if(showNavbar)
            setShowNavbar(false);
    }

    const isAdmin = user ? user.isAdmin : false;

    return <header className={`header ${showNavbar ?`nav` : ''}` }>

            <div className='logo'>
                <h3><Link  className='logoLink' to='/'>FreshOrder</Link></h3>
            </div>

            <div className='menuSelect' onClick={handleShowNavbar}>
                MENU
            </div>

            {/* if Admin not logged */}
            {!isAdmin ?
            <>
                <ul className={`links ${showNavbar ? 'nav' : ''} `} >
                    {/* show only on / index page */}
                    {location.pathname == '/' && 
                    <>
                        <li className='link'><ScrollLink activeClass='active' to='welcome' spy={true} offset={-70} smooth={true}>Welcome</ScrollLink></li>                
                        <li className='link'><ScrollLink activeClass='active' to='category' spy={true} offset={-70} smooth={true}>Menu</ScrollLink></li>
                        <li className='link'><ScrollLink activeClass='active' to='aboutUs' offset={-70} spy={true} smooth={true}>AboutUs</ScrollLink></li>     
                    </>
                    }
                </ul>

                    {/* user authenticated but isn't Admin */}
                    {user && 
                    <ul className={`authList ${showNavbar ? 'nav' : ''} `}>
                        <li><Link className='authLink' onClick={closeShowNavbar} to='/profile'>Profile</Link></li>
                        <li><Link className='authLink' onClick={closeShowNavbar} to='/orders'>Orders</Link></li>
                        <li className='authLinkLogout' onClick={logoutHandler}>Logout</li>
                    </ul>
                    }
            </>
                :
                // <ul className='links'>
                <ul className={`links ${showNavbar ? 'nav' : ''} `} >
                    <li><Link className='link' onClick={closeShowNavbar} to='/products'>Products</Link></li>
                    <li><Link className='link' onClick={closeShowNavbar} to='/users'>Users</Link></li>
                    <li className='link logout' onClick={logoutHandler}>Logout</li>
                </ul>
            }

            {/* user(client or admin) isn't uauthenticated */}
            {!user &&
                // <ul className='authList'>
                <ul className={`authList ${showNavbar ? 'nav' : ''} `}>
                    {/* <li onClick={props.onShowRegisterModal}>Register</li> */}
                    <li onClick={handleRegisterModal}> Register</li>
                    {/* <li onClick={props.onShowLoginModal}>Login</li> */}
                    <li onClick={handleLoginModal}>Login</li>
                </ul>
            }

            {!isAdmin && 
                <div className='cartIcon'>
                    <HeaderCartButton  onClickShow={props.onShowCartModal}/>
                </div> 
            }

        </header>
}

export default Header