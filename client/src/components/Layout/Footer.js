import './Footer.css';

import {Link as ScrollLink} from 'react-scroll';

const Footer = ({isAdmin}) =>{

    return <footer className="footer-container">
        <ul className={`footer_links ${!isAdmin ? '' : 'not-admin'}`}>
            <li className='footer_link'><ScrollLink href='#welcome' activeClass='active' to='welcome' spy={true} offset={-70} smooth={true}>Welcome</ScrollLink></li>                
            <li className='footer_link'><ScrollLink href='#category' activeClass='active' to='category' spy={true} offset={-70} smooth={true}>Menu</ScrollLink></li>
            <li className='footer_link'><ScrollLink href='#aboutUs' activeClass='active' to='aboutUs' offset={-70} spy={true} smooth={true}>AboutUs</ScrollLink></li>       
        </ul>
        <div className='copyright'> 
            © 2023 Copyright: Veckov
        </div>
        <div className='social_icons'>
            <a href='#'><img alt='Facebook Link' src='/FacebookIcon.png' ></img></a>
            <a href='#'><img alt='Instagram Link' src='/InstagramIcon.png'></img></a>
            <a href='#'><img alt='Twiter Link' src='/TwiterIcon.png'></img></a>
        </div>
        
    </footer>
}

export default Footer