import {useState, useContext} from 'react'
import RegisterForm from './RegisterForm.js';
import RegisterModal from './RegisterModal.js';

import axios from 'axios';
import useForm from '../../hooks/useForm.js';

import notificationContext from '../../store/notification-context'

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

    const[loading, setLoading] = useState(false);
    
    //this will be only called in useForm handleRegSubmit(as callback) if input validation passes
    const submitReg = async(event) =>{
        try{
            // setLoading(true);
            const regInfo={
                username:values.username,
                email:values.email,
                password:values.password,
                address:values.address,
                phone_number: values.phone_number
            }
            
            await axios.post('http://localhost:8800/api/auth/register', regInfo)    
            props.showLogin();
            addSuccess("Successfuly registered")

            // setLoading(false);
        }
        catch(err){
            console.log(err);
            addError(err.response.data.message)
        }
    }
    
    const {values, errors, handleChanges, setEmptyFieldError, handleRegSubmit} = useForm(initialInputObject, submitReg);
    
    const regBodyContext =
    <RegisterForm 
        // loading={loading}
            submitForm={handleRegSubmit}
            values={values}
            errors={errors}
            handleChanges={handleChanges}
        />

    return (
        <RegisterModal 
            // loading={loading}
            onCloseRegister={props.onClose}
            regBodyContext={regBodyContext}
        />       
    )
}

export default Register