import {useContext} from 'react'
import RegisterForm from './RegisterForm.js';
import RegisterModal from './RegisterModal.js';

import { axiosBase } from '../../services/axiosJWTInstance.js';
import useForm from '../../hooks/useForm.js';

import notificationContext from '../../store/notification-context'
import modalContext from '../../store/modal-context.js';

const Register = () =>{

    const initialInputObject = {
        username:'', 
        email:'', 
        password:'', 
        repeat_password:'', 
        address:'', 
        phone_number:''
    }
    
    const {addSuccess, addError} = useContext(notificationContext);
    const {showLogin, closeModal} = useContext(modalContext);
    
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
            
            await axiosBase.post('http://localhost:8800/api/auth/register', regInfo)    
            showLogin();
            addSuccess("Successfuly registered")
        }
        catch(err){
            console.error(err);
            addError(err.response.data.message)
        }
    }
    
    const {values, errors, handleChanges, setEmptyFieldError, handleRegSubmit} = useForm(initialInputObject, submitReg);
    
    const regBodyContext =
    <RegisterForm 
            submitForm={handleRegSubmit}
            values={values}
            errors={errors}
            handleChanges={handleChanges}
        />

    return (
        <RegisterModal 
            onCloseRegister={closeModal}
            regBodyContext={regBodyContext}
        />       
    )
}

export default Register