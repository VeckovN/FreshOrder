import { useState, useContext } from 'react'
import Modal from '../UI/Modal.js'
import axios from 'axios'

import './Login.css'

import authContext from '../Store/auth-context'
import notificationContext from '../Store/notification-context.js'

const Login = (props) =>{

    //creaentials
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    //another way to DispatchAction without defined function in auhtContext like in cartContext
    const {user,loading,error,dispatchAction} = useContext(authContext);

    //Notification
    const {addSuccess} = useContext(notificationContext);


    const changeEmailHandler = (event) =>{
        setEnteredEmail(event.target.value)
    }

    const changePasswordHandler = (event) =>{
        setEnteredPassword(event.target.value)
    }

    const submitForm = async (event)=>{
        event.preventDefault();

        //Not send request if is form empty
        if(enteredEmail ==='' && enteredPassword ==='' ){
            const error = {message:'Enter email address and password'}
            dispatchAction({type:"LOGIN_FAILURE", payload:error})
        }
        else{
            //Loading before we fetch user from DB
            dispatchAction({type:"LOGIN_START"})
            try{
                //send HTTP post Request to localhost:8800/api/auth/login
                const res = await axios.post('http://localhost:8800/api/auth/login', {email: enteredEmail, password:enteredPassword })
                //With setted proxy
                //const res = await axios.post('/login', {email: enteredEmail, password:enteredPassword })

                //set timer(to show animation little bit longer) before we change loading to false
                setTimeout(()=>{
                    //This will called after 2000ms =>2s
                    dispatchAction({type:"LOGIN_SUCCESS", payload:res.data})
                    console.log("RES DATA: " + res.data._id);
                    //after success logged, unshown login form
                    props.onClose();
                    addSuccess("You successfuly logged")
                }, 1000);

                // dispatchAction({type:"LOGIN_SUCCESS", payload:res.data})
                // console.log("RES DATA: " + res.data._id);
                // //after success logged, unshown login form
                // props.onClose();
            }
            catch(err){
                console.log("ERROR: " + err.response.data);
                dispatchAction({type:"LOGIN_FAILURE", payload:err.response.data})
                //delete context in input field, TRY ON BEST WAY
                setEnteredPassword('');
                setEnteredEmail('');

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
                <label>Email Address</label>
                <input
                    type='text'
                    id='email'
                    onChange={changeEmailHandler}
                    value={enteredEmail}
                    placeholder='example@gmail.com'
                    
                />
            </div>

            <div className='loginControl-input'>
                <label>Password</label>
                <input
                    type='password'
                    id='password'
                    onChange={changePasswordHandler}
                    value={enteredPassword}
                />
            </div>
            <div className ='loginForm-actions'>
                <button>Submit</button>
            </div>
        </form>

    const regFooterContext = 
        error && <div className='loginError'>Error: <span>{error.message}</span></div>

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