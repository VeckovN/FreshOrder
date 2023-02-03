import {useState} from 'react'
import Modal from "../UI/Modal.js"

import axios from 'axios';

import './Register.css'

const Register = (props) =>{


    const [enteredName, setEnteredName] = useState(''); 
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredAddress, setEnteredAddress] = useState('');
    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');

    const[error, setError] = useState('');

    const changeNameHandler = (event)=>{
        setEnteredName(event.target.value);
    }

    const changeEmailHandler = (event)=>{
        setEnteredEmail(event.target.value);
    }

    const changePasswordHandler = (event)=>{
        setEnteredPassword(event.target.value);
    }

    const changeAddressHandler = (event)=>{
        setEnteredAddress(event.target.value);
    }
    const changePhoneNumberHandler = (event)=>{
        setEnteredPhoneNumber(event.target.value);
    }

    const submitForm = async (event) =>{
        event.preventDefault(); //no page reload

        //axios
        try{
            if(enteredName!='' && enteredEmail!='' && enteredPassword!='' && enteredAddress!='' && enteredPhoneNumber!='')
            {
                const regInfo={
                    username:enteredName,
                    email:enteredEmail,
                    password:enteredPassword,
                    address:enteredAddress,
                    phone_number: enteredPhoneNumber
                }
    
                const res = await axios.post('http://localhost:8800/api/auth/register', regInfo)    
                const resData = res.data;
    
                console.log("SUCCESS: " + resData);
    
                //if error is seted, remove it 
                error && setError('');
                props.showLogin();
                
                // //if error is seted, remove it 
                // error && setError('');
            }
            else{
                setError('Fields are empty!!!');
            }
        }
        catch(err){
            console.log(err);
            setError(err.response.data.message);
        }

    }


    const regHeaderContext =
    'Registration';

    const regBodyContext =
        <form onSubmit={submitForm}>
            <div className='registerControl-input'>
                <label>Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={changeNameHandler}
                    value={enteredName}
                    placeholder='Enter name'
                />
            </div>


            <div className='registerControl-input'>
                <label>Email Address</label>
                <input
                    type='text'
                    id='email'
                    onChange={changeEmailHandler}
                    value={enteredEmail}
                    placeholder="example@gmail.com"
                />
            </div>

            <div className='registerControl-input'>
                <label>Password</label>
                <input
                    type='password'
                    id='password'
                    onChange={changePasswordHandler}
                    value={enteredPassword}
                    placeholder='Enter password'
                />
            </div>

            <div className='registerControl-input'>
                <label>Address</label>
                <input
                    type='text'
                    id='address'
                    onChange={changeAddressHandler}
                    value={enteredAddress}
                    placeholder="Enter address"
                />
            </div>

            <div className='registerControl-input'>
                <label>Phone Number</label>
                <input
                    type='number'
                    id='phone_number'
                    onChange={changePhoneNumberHandler}
                    value={enteredPhoneNumber}
                    min='9'
                    placeholder='Enter digit values'
                />
            </div>

            <div className = 'registerForm-actions'>
                <button>Submit</button>
            </div>
        </form>

    const regFooterContext = 
    error && <div className='registerError'>Error: <span>{error}</span></div>

    return (
        <Modal
        ModalContainerStyle='registerModal'
        HeaderContext = {regHeaderContext}
        BodyContext = {regBodyContext}
        FooterContext = {regFooterContext}
        onCloseModal={props.onClose} 
        // onCloseSignClick={props.onCloseCart}>
        />
            
    )
}

export default Register