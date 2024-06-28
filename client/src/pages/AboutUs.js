import AddressIcon from '../assets/Icons/home-address.png';
import PhoneIcon from '../assets/Icons/phone.png';
import EmailIcon from '../assets/Icons/email.png';

const AboutUs = () =>{

    return(
            <div className='aboutUs-container' id='aboutUs'>
    
                <h1>About us</h1>
                <p>We are not a Fast Food Restaurant Your Food is Made Fresh Every Order.
                    We Are Restaurant with a long tradition and story
                </p>       

                <div className='contactList'>     
                    <div className="contactItem">
                        <div className='contactName'>
                            <img src={AddressIcon} className='contactImg' alt='contactAddress'></img>
                            <p>Address:</p>
                        </div>
                        <p>City - Street</p>
                    </div>

                    <div className="contactItem">
                        <div className='contactName'>
                            <img src={PhoneIcon} className='contactImg' alt='contactPhone'></img>
                            <p>Phone: </p>
                        </div>
                        <p>+381 60 121 5221</p>
                        <p>+381 69 213 2212</p>
                    </div>

                    <div className="contactItem">
                        <div className='contactName'>
                            <img src={EmailIcon} className='contactImg' alt='conactEmail'></img>
                            <p>Email:</p>
                        </div>
                        <p>freshorder@gmail.com</p>
                    </div>
                </div>
            </div>
    )
}

export default AboutUs;