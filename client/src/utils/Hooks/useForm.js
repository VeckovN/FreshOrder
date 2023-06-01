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

    const resetAllValues = () =>{
        Object.keys(values).forEach(key =>{
            values[key] = ''
        })

        console.log("EMPY VALUES : " + JSON.stringify(values) )
    }

    const setEmptyFieldError =() =>{
        console.log("VAU: " + JSON.stringify(values));
        console.log("USERNMALE: " + values.username)

        //THIS WILL ONLY UPDATE LAST STATE ( etc. phone_number)
        Object.keys(values).forEach(key =>{
            //image has null as default value
            if(values[key]=="" || values[key] == null){ //on intial all non entered inputs have '' as value
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

        //differnet way to handle image(file) from input
        if(key == 'image'){
            console.log("Key: " + key + " Values : " + e.target.files.length)
            //validation
            // validateField('image', e.target.files)
            // setValues({
            //     ...values,
            //     [key]:e.target.files[0]
            // })
            if (e.target.files && e.target.files.length > 0){
                alert('Image')
                setValues({
                    ...values,
                    [key]:e.target.files[0]
                })
                RemoveErrorFromObject('image');
            }
            else{
                setErrors((prevState) =>{
                    return({
                        ...prevState,
                        image:"Image Error !!!"
                    })
                })
            }
            return
        }

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

    const handleProductSubmit = (event) =>{
        event.preventDefault();

        if(values.product_name =='' && values.category =='' && values.product_price =='' && values.product_description =='' && !values.image){
            addError("Inputs can not be empty!!!");
            // setAllErrors();
            setEmptyFieldError();
            return
        }
   
        if(values.product_name =='' || values.category =='' || values.product_price =='' || values.product_description ==''){
            addError("Inputs can not be empty!!!");
            setEmptyFieldError();
            return
        }
        if(!values.image){ 
            addError("Choose a image")
            // setImageError(true);
            setErrorWithMessage('image',`The image isn't selected`)
            return
        }

        //all passed
        callback();
    }

    //difference between productSubmit and this edit is that Edit inputs don't have be all filled out
    //(exmaple you can fill ony one input not all of them) //just do validation 
    const handleEditProductSubmit = (event) =>{

        //check all empty input fields
        if(values.product_name =='' && values.product_price =='' && values.product_description ==''){
            addError("Inputs can not be empty!!!");
            // setAllErrors();
            // setEmptyFieldError();
            return;
        }

        //Enter value error is appears after deleting invalid input values
        if(errors.product_name){
            addError("Name " + errors.product_name)
            return;
        }
        else if(errors.product_price){
            addError("Price " +errors.product_price)
            return;
        }
        else if(errors.product_description){
            addError(errors.product_description)
            return;
        }
            
        callback();
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

                case 'image':
                    if (!value && !value.length > 0){
                        setErrorWithMessage('image', "Image error ")
                    }
                    else{
                        RemoveErrorFromObject('image')
                    }
                    break;

                //other cases instead of just login and register forms  :D
                case 'product_name':
                    if(!value.match(/^[A-Z]/))
                        setErrorWithMessage('product_name', 'Must start with capital letter')
                    else if(!value.match(/[A-Za-z]+$/))
                        setErrorWithMessage('product_name', "Only latters alowed")
                    else{
                        RemoveErrorFromObject('product_name');
                    }
                    break;

                case 'product_description':
                    if(!value.match(/^(?=.{0,30}$)/)){
                        setErrorWithMessage('product_description', "Only 30 characters alowed")
                    }   
                    else{
                        RemoveErrorFromObject('product_description')
                    } 
                    break;
                
                case 'product_price':
                    if(!value.match(/[0-9]/)){
                        setErrorWithMessage('product_price', "Only digits availabed")
                    }
                    else{
                        RemoveErrorFromObject('product_price');
                    }
                    break;

                //remove error after selecting empty category
                case 'category':
                    if(value){
                        RemoveErrorFromObject('category');
                    }

                default:
                    break;
            }
        }
        else{
            // setErrorWithMessage(keyName, "Enter value"); //this is bug
            RemoveErrorFromObject(keyName); //remove the error when the last letter is deleted from the input
            //no letters no errors
        }
    }

    return {
        values,
        errors,
        setEmptyFieldError,
        resetAllValues,
        RemoveValueFromObject,
        handleChanges,
        handleRegSubmit,
        handleProductSubmit,
        handleEditProductSubmit
    }

}
export default useForm;
