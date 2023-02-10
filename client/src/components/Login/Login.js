import { useState, useContext } from 'react'
import Modal from '../UI/Modal.js'
import axios from 'axios'

import './Login.css'
import useForm from '../../utils/Hooks/useForm.js'

import authContext from '../Store/auth-context'
import notificationContext from '../Store/notification-context.js'

const Login = (props) =>{

    const initialInputObject ={
        email:'',
        password:''
    }
    const {values, errors, handleChanges, setEmptyFieldError } = useForm(initialInputObject)
   
    //another way to DispatchAction without defined function in auhtContext like in cartContext
    const {user,loading,error,dispatchAction, loggin} = useContext(authContext);

    //Notification
    const {addSuccess} = useContext(notificationContext);

    const submitForm = async (event)=>{
        event.preventDefault();

        //Not send request if is form empty
        if(values.email ==='' && values.password ==='' ){
            const error = {message:'Enter email address and password'}
            setEmptyFieldError();
            dispatchAction({type:"LOGIN_FAILURE", payload:error})
        }
        else{
            //Loading before we fetch user from DB
            dispatchAction({type:"LOGIN_START"})
            try{
                //send HTTP post Request to localhost:8800/api/auth/login
                const res = await axios.post('http://localhost:8800/api/auth/login', {email: values.email, password:values.password })
                //With setted proxy
                //const res = await axios.post('/login', {email: enteredEmail, password:enteredPassword })

                //set timer(to show animation little bit longer) before we change loading to false
                setTimeout(()=>{
                    loggin(res.data);
                    console.log("RES DATA: " + res.data._id);
                    props.onClose();
                    addSuccess("You successfuly logged")
                }, 1000);
            }
            catch(err){
                console.log("ERR: " + err);
                // console.log("ERROR: " + err.response.data);
                dispatchAction({type:"LOGIN_FAILURE", payload:err.response.data})
                // setEnteredPassword('');
                // setEnteredEmail('');
                values.email = '';
                values.password ='';
                
                console.log("ERROR: " + err.response.data.message);
            }

            console.log("USER: " +user);
            //console.log(enteredEmail + " " + enteredPassword);
        }
    }

    const regHeaderContext =
    'Login';

    const regLoading = 
        <div></div>

    const regBodyContext =
        <form className='loginForm' onSubmit={submitForm}>
            {loading &&
            <div className='loadingBackground'>
                <div className='loader'></div>
            </div>
            }

            <div className='loginControl-input'>
                <label className='reg_label'>Email Address</label>
                <div className='login_input_field'>
                    <input
                        type='text'
                        name='email'
                        onChange={handleChanges}
                        value={values.email || ''}
                        placeholder='example@gmail.com'
                        className={errors.email && 'error'}
                    />
                    {errors.email && <label>{errors.email}</label>}
                </div>
            </div>

            <div className='loginControl-input'>
                <label className='reg_label'>Password</label>
                <div className='login_input_field'>
                    <input
                        type='password'
                        name='password'
                        onChange={handleChanges}
                        value={values.password || ''}
                        placeholder='Enter password'
                        className={errors.password && 'error'}
                    />
                    {errors.password && <label>{errors.password}</label>}
                </div>
            </div>
            <div className ='loginForm-actions'>
                <button>Submit</button>
            </div>
        </form>

    const regFooterContext = 
        error && <div className='loginError'> <span>{error.message}</span></div>

    //When is modal closed set error,loading and user to initiated value(false,null,null)
    const onCloseLoginModal =()=>{
        dispatchAction({type:"RESET"});
        //after that login form wont show error message when is modal closed
        props.onClose();
    }

    return (
        <Modal
        ModalContainerStyle='loginModal'
        HeaderContext = {regHeaderContext}
        BodyContext = {regBodyContext}
        FooterContext = {regFooterContext}
        // onCloseModal={props.onClose} 
        onCloseModal={onCloseLoginModal} 
        // onCloseSignClick={props.onCloseCart}>
        />
    )
}

export default Login