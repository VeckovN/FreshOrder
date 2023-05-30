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

    // const submitForm = async (event) =>{
    //     event.preventDefault(); //no page reload
    //     console.log("username: " + values.username + " email : " + values.email +  " password: " + values.password + " address: " + values.address + " phone_number: " + values.phone_number)

    //     try{
    //         if((values.username=='' || values.username == undefined) || (values.email=='' || values.email == undefined) || (values.password=='' || values.password == undefined) || (values.repeat_password=='' || values.repeat_password == undefined) || (values.address=='' || values.address == undefined) || (values.phone_number=='' || values.phone_number == undefined) ){
    //             setEmptyFieldError();
    //             addError("Empty Fields")
    //             return
    //         }

    //         if(Object.keys(errors).length == 0)
    //         {
    //             if((values.password != values.repeat_password)){
    //                 addError("Passwords aren't same")
    //                 return
    //             }

    //             const regInfo={
    //                 username:values.username,
    //                 email:values.email,
    //                 password:values.password,
    //                 address:values.address,
    //                 phone_number: values.phone_number
    //             }
    
    //             const res = await axios.post('http://localhost:8800/api/auth/register', regInfo)    
    //             const resData = res.data;;
    //             props.showLogin();
    //             addSuccess("Successfuly registered")
    //         }
    //         else{
    //             addError("Incorrect input")
    //         }
    //     }
    //     catch(err){
    //         console.log(err);
    //         addError(err.response.data.message)
    //         // addError(err.response.data)
    //         // setError(err.response.data.message);
    //     }
    // }

    const regBodyContext =
        <RegisterForm 
            // submitForm={submitForm}
            submitForm={handleRegSubmit} //with submitReg callback in useForm
            values={values}
            errors={errors}
            handleChanges={handleChanges}
        />

    return (
        <RegisterModal 
            onCloseRegister={props.onClose}
            regBodyContext={regBodyContext}
            error={error}
        />
            
    )
}

export default Register