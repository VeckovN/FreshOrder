import React, {Fragment, useRef, useContext} from 'react'
import {Link as ScrollLink} from 'react-scroll';
import {Link, useNavigate, useLocation} from 'react-router-dom'

import './Header.css'
import HeaderCartButton from './HeaderCartButton';

import authContext from '../Store/auth-context'
import notificationContext from '../Store/notification-context.js'

//React.memo won't work when is modal clicked because Header props are showModal state
const Header = props => {
    const {user, dispatchAction} = useContext(authContext);
    const {addSuccess} = useContext(notificationContext)
    const nav = useNavigate();
    const location = useLocation();

    //TEST THIS
    const logoutHandler =()=>{
        dispatchAction({type:"LOGOUT"});
        nav('/'); //nav to '/' route
        addSuccess('You have logged out') 
    }

    const isAdmin = user ? user.isAdmin : false;

    return <header className='header'>

            {console.log("HEADERRRRRRRRRR NOWWWWWWWWWW")}
            <div className='logo'>
                <h3><Link className='logoLink' to='/'>FreshOrder</Link></h3>
            </div>

            {/* if Admin not logged */}
            {!isAdmin ?
                <ul className='links'>
                    {/* show only on / index page */}
                    {location.pathname == '/' && 
                    <>
                        <li className='link'><ScrollLink activeClass='active' to='welcome' spy={true} offset={-70} smooth={true}>Welcome</ScrollLink></li>                
                        <li className='link'><ScrollLink activeClass='active' to='category' spy={true} offset={-70} smooth={true}>Menu</ScrollLink></li>
                        <li className='link'><ScrollLink activeClass='active' to='aboutUs' offset={-70} spy={true} smooth={true}>AboutUs</ScrollLink></li>     
                    </>
                    }
                    
                </ul>
                :
                <ul className='links'>
                    <li><Link className='link' to='/products'>Products</Link></li>
                    <li><Link className='link' to='/users'>Users</Link></li>
                    <li className='logout' onClick={logoutHandler}>Logout</li>
                </ul>
            }

            {/* user authenticated but isn't Admin */}
            {user && !isAdmin &&
               <ul className='authList'>
                    <li><Link className='authLink' to='/profile'>Profile</Link></li>
                    <li><Link className='authLink' to='/orders'>Orders</Link></li>
                    <li className='authLinkLogout' onClick={logoutHandler}>Logout</li>
                </ul>
            }

            {/* user(client or admin) isn't uauthenticated */}
            {!user &&
                <ul className='authList'>
                    <li onClick={props.onShowRegisterModal}>Register</li>
                    <li onClick={props.onShowLoginModal}>Login</li>
                </ul>
            }

{/*             
                <ul className='authList'>
                    <li onClick={props.onShowRegisterModal}>Register</li>
                    <li onClick={props.onShowLoginModal}>Login</li>
                </ul>
                
            } */}

            {!isAdmin && 
                <div className='cartIcon'>
                    <HeaderCartButton  onClickShow={props.onShowCartModal}/>
                </div> 
            }
        
            {/* <HeaderCartButton /> */}
        </header>
}

export default Header