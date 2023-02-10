import {useState} from 'react'
import Modal from "../UI/Modal.js"

import axios from 'axios';
import useForm from '../../utils/Hooks/useFormSelect.js';

import './Register.css'

const Register = (props) =>{



    const {values, errors, handleChanges} = useForm();


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
                <div className='register_input_field'>
                    <input
                        type='text'
                        name='username'
                        onChange={changeNameHandler}
                        value={enteredName}
                        placeholder='Enter name'
                    />
                    {<label></label>}
                </div>
            </div>


            <div className='registerControl-input'>
                <label>Email Address</label>
                <div className='register_input_field'>
                    <input
                        type='text'
                        name='email'
                        onChange={changeEmailHandler}
                        value={enteredEmail}
                        placeholder="example@gmail.com"
                    />
                    {<label></label>}
                </div>
                
            </div>

            <div className='registerControl-input'>
                <label>Password</label>
                <div className='register_input_field'>
                    <input
                        type='password'
                        name='password'
                        onChange={changePasswordHandler}
                        value={enteredPassword}
                        placeholder='Enter password'
                    />
                    {<label></label>}
                </div>
                
            </div>

            <div className='registerControl-input'>
                <label>Repeat Password</label>
                <div className='register_input_field'>
                    <input
                        type='password'
                        name='repeat_password'
                        onChange={changePasswordHandler}
                        value={enteredPassword}
                        placeholder='Enter password'
                    />
                    {<label></label>}
                </div>
                
            </div>

            <div className='registerControl-input'>
                <label>Address</label>
                <div className='register_input_field'>
                    <input
                        type='text'
                        name='address'
                        onChange={changeAddressHandler}
                        value={enteredAddress}
                        placeholder="Enter address"
                    />
                    {<label></label>}
                </div>
            </div>

            <div className='registerControl-input'>
                <label>Phone Number</label>
                <div className='register_input_field'>
                    <input
                        type='number'
                        name='phone_number'
                        onChange={changePhoneNumberHandler}
                        value={enteredPhoneNumber}
                        min='9'
                        placeholder='Enter digit values'
                    />
                    { <label></label>}
                </div>
                
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