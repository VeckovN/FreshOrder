import { useState, useContext } from 'react'
import axios from 'axios'

import './Login.css'
import useForm from '../../utils/Hooks/useForm.js'

import authContext from '../Store/auth-context'
import notificationContext from '../Store/notification-context.js'
import LoginForm from './LoginForm';
import LoginModal from './LoginModal.js'

const Login = (props) =>{

    const initialInputObject ={
        email:'',
        password:''
    }
    const {values, errors, handleChanges, setEmptyFieldError } = useForm(initialInputObject)
    //another way to DispatchAction without defined function in auhtContext like in cartContext
    const {user,loading,error,dispatchAction, loggin} = useContext(authContext);

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

                //FIX THIS-> this setTimeout ins't used properly 
                // https://felixgerschau.com/react-hooks-settimeout/

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
                dispatchAction({type:"LOGIN_FAILURE", payload:err.response.data})
                // setEnteredPassword('');
                // setEnteredEmail('');
                values.email = '';
                values.password ='';
                console.log("ERROR: " + err.response.data.message);
            }
        }
    }

    //When is modal closed set error,loading and user to initiated value(false,null,null)
    const onCloseLoginModal =()=>{
        dispatchAction({type:"RESET"});
        //after that login form wont show error message when is modal closed
        props.onClose();
    }

    const logBodyContext  = 
        <LoginForm 
            loading={loading} 
            values={values} 
            submitForm={submitForm} 
            handleChanges={handleChanges} 
            errors={errors}
        />

    return (
        <LoginModal 
            onCloseLogin={onCloseLoginModal}
            logBodyContext={logBodyContext}
            error={error}
        />
    )
}

export default Login