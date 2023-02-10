import {useState, useContext} from 'react'
import Modal from "../UI/Modal.js"

import axios from 'axios';
import useForm from '../../utils/Hooks/useForm.js';

import notificationContext from '../Store/notification-context'

import './Register.css'

const Register = (props) =>{

    const initialInputObject = {
        username:'', 
        email:'', 
        password:'', 
        repeat_password:'', 
        address:'', 
        phone_number:''
    }
    const {values, errors, handleChanges, setEmptyFieldError} = useForm(initialInputObject);

    const {addSuccess, addError} = useContext(notificationContext);

    const[error, setError] = useState('');

    const submitForm = async (event) =>{
        event.preventDefault(); //no page reload
        console.log("username: " + values.username + " email : " + values.email +  " password: " + values.password + " address: " + values.address + " phone_number: " + values.phone_number)

        try{
            if((values.username=='' || values.username == undefined) || (values.email=='' || values.email == undefined) || (values.password=='' || values.password == undefined) || (values.repeat_password=='' || values.repeat_password == undefined) || (values.address=='' || values.address == undefined) || (values.phone_number=='' || values.phone_number == undefined) ){
                setEmptyFieldError();
                addError("Empty Fields")
                return
            }

            if(Object.keys(errors).length == 0)
            {
                if((values.password != values.repeat_password)){
                    addError("Passwords aren't same")
                    return
                }

                const regInfo={
                    username:values.username,
                    email:values.email,
                    password:values.password,
                    address:values.address,
                    phone_number: values.phone_number
                }
    
                const res = await axios.post('http://localhost:8800/api/auth/register', regInfo)    
                const resData = res.data;

                // //if error is seted, remove it 
                // error && setError('');
                props.showLogin();
                addSuccess("Successfuly registered")
            }
            else{
                addError("Incorrect input")
            }

            
        }
        catch(err){
            console.log(err);
            addError(err.response.data.message)
            // addError(err.response.data)
            // setError(err.response.data.message);
        }
    }


    const regHeaderContext =
    'Registration';

    const regBodyContext =
        <form onSubmit={submitForm}>
            <div className='registerControl-input'>
                <label className='reg_label'>Username</label>
                <div className='register_input_field'>
                    <input
                        type='text'
                        name='username'
                        onChange={handleChanges}
                        value={values.username || ''}
                        placeholder='Enter name'
                        className={errors.username && 'error'}
                    />
                    {errors.username && <label>{errors.username}</label>}
                </div>
            </div>


            <div className='registerControl-input'>
                <label className='reg_label'>Email Address</label>
                <div className='register_input_field'>
                    <input
                        type='text'
                        name='email'
                        onChange={handleChanges}
                        value={values.email || ''}
                        placeholder="example@gmail.com"
                        className={errors.email && 'error'}
                    />
                    {errors.email &&<label>{errors.email}</label>}
                </div>
                
            </div>

            <div className='registerControl-input'>
                <label className='reg_label'>Password</label>
                <div className='register_input_field'>
                    <input
                        type='password'
                        name='password'
                        onChange={handleChanges}
                        value={values.password || ''}
                        placeholder='Enter password'
                        className={errors.password && 'error'}
                    />
                    {errors.password &&<label>{errors.password}</label>}
                </div>
                
            </div>

            <div className='registerControl-input'>
                <label className='reg_label'>Repeat Password</label>
                <div className='register_input_field'>
                    <input
                        type='password'
                        name='repeat_password'
                        onChange={handleChanges}
                        value={values.repeat_password || ''}
                        placeholder='Enter password'
                        className={errors.repeat_password && 'error'}
                    />
                    {errors.repeat_password && <label>{errors.repeat_password}</label>}
                </div>
                
            </div>

            <div className='registerControl-input'>
                <label className='reg_label'>Address</label>
                <div className='register_input_field'>
                    <input
                        type='text'
                        name='address'
                        onChange={handleChanges}
                        value={values.address || ''}
                        placeholder="Enter address"
                        className={errors.address && 'error'}
                    />
                    {errors.address && <label>{errors.address}</label>}
                </div>
            </div>

            <div className='registerControl-input'>
                <label className='reg_label'>Phone Number</label>
                <div className='register_input_field'>
                    <input
                        type='number'
                        name='phone_number'
                        onChange={handleChanges}
                        value={values.phone_number || ''}
                        min='9'
                        placeholder='Enter digit values'
                        className={errors.phone_number && 'error'}
                    />
                    {errors.phone_number && <label>{errors.phone_number}</label>}
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