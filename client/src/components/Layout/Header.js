import React, {Fragment, useRef,useState, useContext} from 'react'
// import {Link as ScrollLink} from 'react-scroll';
import {Link as ScrollLink} from 'react-scroll';
import {Link, useNavigate, useLocation} from 'react-router-dom'

import './Header.css'
import HeaderCartButton from './HeaderCartButton';

import authContext from '../Store/auth-context'
import notificationContext from '../Store/notification-context.js'

//React.memo won't work when is modal clicked because Header props are showModal state
const Header2 = props => {
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

    return (
        <header className={`header ${showNavbar ?`nav` : ''}` }>
             <div className='logo'>
                <h3><Link  className='logoLink' to='/'>FreshOrder</Link></h3>
            </div>

            <div className='menuSelect' onClick={handleShowNavbar}>
                MENU
            </div>

            {/* <div className='headerLinks'> */}
                <ul className={`links ${showNavbar ? 'nav' : ''} `} >
                    {isAdmin ?
                    <>
                        <li><Link className='link' onClick={closeShowNavbar} to='/products'>Products</Link></li>
                        <li><Link className='link' onClick={closeShowNavbar} to='/users'>Users</Link></li>
                        <li className='link logout' onClick={logoutHandler}>Logout</li>
                    </>
                    :
                    <> 
                        {/* show only on / index page */}
                        {location.pathname == '/' && 
                        <>
                            <li className='link'><ScrollLink to='welcome' spy={true} offset={-70} smooth={true}>Welcome</ScrollLink></li>                
                            <li className='link'><ScrollLink activeClass='active' to='category' spy={true} offset={-70} smooth={true}>Menu</ScrollLink></li>
                            <li className='link'><ScrollLink activeClass='active' to='aboutUs' offset={-70} spy={true} smooth={true}>AboutUs</ScrollLink></li>     
                        </>
                        }

                        {/* when user isn't admin but it't authenticated*/}
                        {user &&
                        <>
                            <li><Link className='link' onClick={closeShowNavbar} to='/profile'>Profile</Link></li>
                            <li><Link className='link' onClick={closeShowNavbar} to='/orders'>Orders</Link></li>
                            <li className='link logout' onClick={logoutHandler}>Logout</li>
                        </>
                        }
                    </>
                    }
            

                    {!user &&
                    <>
                        <li className='link' onClick={handleRegisterModal}> Register</li>
                        <li className='link' onClick={handleLoginModal}>Login</li>
                    </>
                    }

                </ul>
            {/* </div> */}

            {!isAdmin && 
            <div className='cartIcon'>
                <HeaderCartButton  onClickShow={props.onShowCartModal}/>
            </div> 
            }

        </header>
    )
}

export default Header2;

