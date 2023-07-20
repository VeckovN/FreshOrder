import { useRef, useContext, useEffect } from 'react'
import axios from 'axios' 

import './Login.css'
import useForm from '../../utils/Hooks/useForm.js'

import authContext from '../Store/auth-context'
import notificationContext from '../Store/notification-context.js'
import LoginForm from './LoginForm';
import LoginModal from './LoginModal.js'

const Login = (props) =>{

    const timerRef = useRef(null);
    const initialInputObject ={
        email:'',
        password:''
    }
    const {values, errors, handleChanges, setEmptyFieldError } = useForm(initialInputObject)
    //another way to DispatchAction without defined function in auhtContext like in cartContext
    const {user,loading,error,dispatchAction, loggin} = useContext(authContext);

    const {addSuccess, addError} = useContext(notificationContext);

    const submitForm = async (event)=>{
        event.preventDefault();
        if(values.email ==='' && values.password ==='' ){
            const error = {message:'Enter email address and password'}
            setEmptyFieldError();
            dispatchAction({type:"LOGIN_FAILURE", payload:error})
            addError(error.message);
        }
        else{
            //Loading before we fetch user from DB
            dispatchAction({type:"LOGIN_START"})
            try{
                const res = await  axios.post('http://localhost:8800/api/auth/login', {email: values.email, password:values.password })
                //Moved this to useEffect 
                //set timer(to show animation little bit longer) before we change loading to false
                timerRef.current = setTimeout(()=>{
                    loggin(res.data);
                    console.log("RES DATA: " + res.data._id);
                    props.onClose();
                    addSuccess("You successfuly logged")
                }, 1000);
            }
            catch(err){
                alert("er" + err);
                if(err.response){
                    addError(err.response.data.message);
                    dispatchAction({type:"LOGIN_FAILURE", payload:err.response.data})
                }
                else{
                    dispatchAction({type:"LOGIN_FAILURE", payload:err})
                    addError("Error");
                }
                values.email = '';
                values.password ='';
                // addError(err.response.data.message);
            }
        }
    }

    // const handleEnterKey = (event) =>{

    //     alert("KEYDOWN: " + event.key);
    //     if(event.key === "Enter")
    //     {
    //         alert("ENTERR");
    //         event.preventDefault();
    //         this.submitForm();
    //     }
    // }

    //With useREf
    useEffect( () =>{
        //clear the inteval on component unmount
        return() => clearTimeout(timerRef.current);
    },[])


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
            // submitForm={submitForm} 
            handleChanges={handleChanges} 
            errors={errors}
        />

    return (
        <LoginModal 
            onCloseLogin={onCloseLoginModal}
            logBodyContext={logBodyContext}
            error={error}
            submitForm={submitForm}
        />
    )
}

export default Login