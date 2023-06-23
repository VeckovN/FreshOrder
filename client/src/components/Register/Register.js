import {useState, useContext} from 'react'
import Modal from "../UI/Modal/Modal.js"
import RegisterForm from './RegisterForm.js';
import RegisterModal from './RegisterModal.js';

import axios from 'axios';
import useForm from '../../utils/Hooks/useForm.js';

import notificationContext from '../Store/notification-context'

// import './Register.css'

const Register = (props) =>{

    const initialInputObject = {
        username:'', 
        email:'', 
        password:'', 
        repeat_password:'', 
        address:'', 
        phone_number:''
    }

    const {addSuccess, addError} = useContext(notificationContext);
    const[error, setError] = useState('');

    //this will be only called in useForm handleRegSubmit(as callback) if input validation passes
    const submitReg = async(event) =>{
        try{
            const regInfo={
                username:values.username,
                email:values.email,
                password:values.password,
                address:values.address,
                phone_number: values.phone_number
            }

            const res = await axios.post('http://localhost:8800/api/auth/register', regInfo)    
            const resData = res.data;

            props.showLogin();
            addSuccess("Successfuly registered")
            
        }
        catch(err){
            console.log(err);
            addError(err.response.data.message)
        }
    }

    const {values, errors, handleChanges, setEmptyFieldError, handleRegSubmit} = useForm(initialInputObject, submitReg);

    const regBodyContext =
        <RegisterForm 
            // submitForm={submitForm}
            // submitForm={handleRegSubmit} //with submitReg callback in useForm
            values={values}
            errors={errors}
            handleChanges={handleChanges}
        />

    return (
        <RegisterModal 
            onCloseRegister={props.onClose}
            regBodyContext={regBodyContext}
            error={error}
            submitForm={handleRegSubmit} //with submitReg callback in useForm
        />
            
    )
}

export default Register