import './Footer.css';

import {Link as ScrollLink} from 'react-scroll';

const Footer = props =>{

    return <footer className="footer-container">
        <ul className='footer_links'>
            <li className='footer_link'><ScrollLink activeClass='active' to='welcome' spy={true} offset={-70} smooth={true}>Welcome</ScrollLink></li>                
            <li className='footer_link'><ScrollLink activeClass='active' to='category' spy={true} offset={-70} smooth={true}>Menu</ScrollLink></li>
            <li className='footer_link'><ScrollLink activeClass='active' to='aboutUs' offset={-70} spy={true} smooth={true}>AboutUs</ScrollLink></li>       
        </ul>
        <div className='copyright'> 
            © 2022 Copyright: Veckov
        </div>
        <div className='social_icons'>
            <a href='#' ><img alt='Facebook Link' src={require('../../../src/assets/Icons/FacebookIcon.png')}></img></a>
            <a href='#'><img alt='Instagram Link' src={require('../../../src/assets/Icons/InstagramIcon.png')}></img></a>
            <a href='#'><img alt='Twiter Link' src={require('../../../src/assets/Icons/TwiterIcon.png')}></img></a>
        </div>
    </footer>
}

export default Footer