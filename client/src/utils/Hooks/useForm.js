//useForm hook used for classic form validation

import { useState, useContext } from "react";
import notificationContext from "../../components/Store/notification-context";


const useForm = (inputObj, callback) =>{

    const [values, setValues] = useState(inputObj);  //valuse={username:'novak', email:'novak@gmail.com'}
    const [errors, setErrors] = useState({});

    const {addSuccess, addError} = useContext(notificationContext);

    console.log("\n VALUES : " + JSON.stringify(values));
    console.log("\n ERRORS " + JSON.stringify(errors));

    const setErrorWithMessage = (keyName, message) =>{
        setErrors({
            ...errors,
            [keyName]:message
        })
    }

    const setEmptyFieldError =() =>{
        console.log("VAU: " + JSON.stringify(values));
        console.log("USERNMALE: " + values.username)

        //THIS WILL ONLY UPDATE LAST STATE ( etc. phone_number)
        Object.keys(values).forEach(key =>{
            if(values[key]==""){ //on intial all non entered inputs have '' as value
                setErrors((prevState)=>{ //notify all empty fields 
                    return({
                        ...prevState,
                        [key]:"It cant be empty"
                    })
                })
            }
        })
    }
    const setPasswordFieldError = () =>{
        setErrors((prevState) =>{
            return({
                ...prevState,
                password:`enter new password`,
                repeat_password:`repeat entered password`
            })
        })
        //Delete password from values(input)
        setValues((prevState) =>{
            return({
                ...prevState,
                password:'',
                repeat_password:''
            })
        })

    }

    const RemoveErrorFromObject = (keyName) =>{
        let {[keyName]: anyValue, ...res} = errors
        setErrors(res);
    }
    const RemoveValueFromObject = (keyName) =>{
        let {[keyName]: anyValue, ...res} = values
        setValues(res);
    }

    const handleChanges = (e) =>{
        const key = e.target.name;
        const value = e.target.value;

        validateField(key,value);
        setValues({
            ...values,
            [key]:value
        })
    }


    const handleRegSubmit = (event) =>{
        event.preventDefault(); //no page reload
        console.log("username: " + values.username + " email : " + values.email +  " password: " + values.password + " address: " + values.address + " phone_number: " + values.phone_number)
        
        if((values.username=='' || values.username == undefined) || (values.email=='' || values.email == undefined) || (values.password=='' || values.password == undefined) || (values.repeat_password=='' || values.repeat_password == undefined) || (values.address=='' || values.address == undefined) || (values.phone_number=='' || values.phone_number == undefined) ){
            setEmptyFieldError();
            addError("Empty Fields")
            return
        }

        if(Object.keys(errors).length == 0) 
        {
            if((values.password != values.repeat_password)){
                addError("Passwords aren't same")
                setPasswordFieldError();
                return
            }
            
            //call callback func passed in useForm as second paramater
            callback(); //execute it when on valid inputs
        }
        else{
            addError("Incorrect input")
        }
    }

    const validateField = (keyName, value ) =>{
        console.log("KEYNAME: " + typeof(keyName) + ", VALUE: " + value )
        if(value != ''){
            switch(keyName){
                case 'username':
                    // let usernameValid = value.match(/^[a-zA-Z\-]+$/);
                    if(value.length <=4)
                        setErrorWithMessage("username","Username atleast have 5 latters")
                    // else if(!value.match(/^[a-zA-Z\-]+$/)){
                    else if(!value.match(/^[a-zA-Z][a-zA-Z0-9\-]+$/)){
                        setErrorWithMessage("username","No sign or number on start")
                    }
                    else{
                        //Delete Errors from object (errors may exist in object and it must be deleted)
                        RemoveErrorFromObject("username");
                    }
                    break;
                case 'email':
                    if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                        setErrorWithMessage("email","Enter a valid email address")
                    }
                    else{
                        RemoveErrorFromObject("email");
                    }
                    break;

                case 'phone_number':
                    // if(!value.match(/^\[0-9]{9,10}$/)){
                        if(!value.match(/^\d{9,10}$/)){
                        setErrorWithMessage("phone_number", "Between 9 and 10 digits")
                    }
                    else{
                        RemoveErrorFromObject("phone_number");
                    }
                    break;

                case 'address':
                    if(!value.match(/[A-Za-z0-9'\.\-\s\,]/)){
                        setErrorWithMessage("address", "Incorrect Address")
                    }
                    else{
                        RemoveErrorFromObject("address");
                    }
                    break;

                case 'password':
                    if(!value.match(/[A-Za-z0-9]/)){
                        setErrorWithMessage("password", "Incorect Password")
                    }
                    else{
                        RemoveErrorFromObject("password");
                    }
                    break;

                case 'repeat_password':
                    if(!value.match(/[A-Za-z0-9]/)){
                        setErrorWithMessage("repeat_password", "Incorect repeat password")
                    }
                    else{
                        RemoveErrorFromObject("repeat_password");
                    }
                    break;

                //other cases instead of just login and register forms  :D
                // case 'product_name':
                //     if(!){

                //     }
                //     else{

                //     }
                //     break;
                
                // case 'product_category':
                //     if(!){

                //     }
                //     else{

                //     }
                //     break;

                // case 'product_description':
                //     if(!){

                //     }   
                //     else{

                //     } 
                //     break;
                
                // case 'product_price':
                //     if(!){

                //     }
                //     else{

                //     }
                //     break;

                default:
                    break;
            }
        }
        else{
            setErrorWithMessage(keyName, "Enter value");
        }
    }

    return {
        values,
        errors,
        setEmptyFieldError,
        handleChanges,
        handleRegSubmit
    }

}
export default useForm;
