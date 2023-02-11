//useForm hook used for classic form validation

import { useState } from "react";


const useForm = (inputObj) =>{

    const [values, setValues] = useState(inputObj);  //valuse={username:'novak', email:'novak@gmail.com'}
    const [errors, setErrors] = useState({});

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
        let Errorkeys=[]

        //THIS WILL ONLY UPDATE LAST STATE ( phone_nubmer)
        Object.keys(values).forEach(key =>{
            if(values[key]==""){
                //THIS WILL OVERIDE ALL PERVIPUS STATE (Only last state(phone_number) will have seted error)
                // setErrors({
                //     ...errors,
                //     [key]:"It cant be empty"
                // })
                setErrors((prevState)=>{
                    return({
                        ...prevState,
                        [key]:"It cant be empty"
                    })
                })
            }
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

        if(value == ''){
            console.log("VALUE = ''")
        }

        console.log("VALUEE: " + value);
        validateField(key,value);
        setValues({
            ...values,
            [key]:value
        })
    }


    const submitHandler = (e) =>{
        // e.preventDefault();

        // submitCallback();

        //check there isn't empty field
        // Object.keys(values).forEach(el =>{
        //     if(values[el] == '' || values[el] == undefined)
        //         setErrors(el, "Enter value in field")
        // })

        //submitCallback();
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
                    if(!value.match(/[0-9]{9,10}/)){
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
        submitHandler
    }

}
export default useForm;
