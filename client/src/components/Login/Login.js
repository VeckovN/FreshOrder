import { useRef, useContext, useEffect} from 'react'
import axios from 'axios' 

import useForm from '../../hooks/useForm.js';
import authContext from '../../store/auth-context'
import notificationContext from '../../store/notification-context.js'
import modalContext from '../../store/modal-context.js';

import LoginForm from './LoginForm';
import LoginModal from './LoginModal.js'
import './Login.css' 

const Login = () =>{

    const timerRef = useRef(null);
    const initialInputObject ={
        email:'',
        password:''
    }
    const {values, errors, handleChanges, setEmptyFieldError } = useForm(initialInputObject)
    //another way to DispatchAction without defined function in auhtContext like in cartContext
    const {loading, dispatchAction, loggin} = useContext(authContext);
    const {addSuccess, addError} = useContext(notificationContext);
    const {closeModal, showRegister} = useContext(modalContext);

    const submitForm = async (event)=>{
        event.preventDefault();
        if(values.email ==='' && values.password ==='' ){
            const error = {message:'Enter email address and password'}
            setEmptyFieldError();
            dispatchAction({type:"LOGIN_FAILURE", payload:error})
            addError(error.message);
        }
        else{
            dispatchAction({type:"LOGIN_START"})
            try{
                const res = await  axios.post('http://localhost:8800/api/auth/login', {email: values.email, password:values.password })
                timerRef.current = setTimeout(()=>{
                    loggin(res.data);
                    closeModal();
                    addSuccess("You successfuly logged")
                }, 1000);
            }
            catch(err){
                if(err.response){
                    timerRef.current = setTimeout(()=>{
                        addError(err.response.data.message);
                        dispatchAction({type:"LOGIN_FAILURE", payload:err.response.data})
                    }, 200);
                }
                else{
                    dispatchAction({type:"LOGIN_FAILURE", payload:err})
                    addError("Error");
                }
                values.email = '';
                values.password ='';
            }
        }
    }

    useEffect( () =>{
        //clear the inteval on component unmount
        return() => {
            if(timerRef.current)
                clearTimeout(timerRef.current);
        }
    },[])


    //When is modal closed set error,loading and user to initiated value(false,null,null)
    const onCloseLoginModal =()=>{
        dispatchAction({type:"RESET"});
        closeModal()
    }

    const logBodyContext  = 
        <LoginForm 
            loading={loading} 
            values={values} 
            submitForm={submitForm} 
            handleChanges={handleChanges} 
            errors={errors}
            showRegister={showRegister}
        />
    return (
        <LoginModal 
            loading={loading}
            onCloseLogin={onCloseLoginModal}
            logBodyContext={logBodyContext}
        />
    )
}

export default Login