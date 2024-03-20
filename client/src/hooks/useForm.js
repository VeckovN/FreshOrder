//useForm hook used for classic form validation
import { useState, useContext } from "react";
import notificationContext from "../store/notification-context";


const useForm = (inputObj, callback) =>{

    const [values, setValues] = useState(inputObj);  //valuse={username:'novak', email:'novak@gmail.com'}
    const [errors, setErrors] = useState({});
    const [shows, setShows] = useState({}); //on click user profile info show input to change it

    const {addSuccess, addError} = useContext(notificationContext);

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
    }

    const setEmptyFieldError =() =>{
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
    const RemoveShowsFromObject = (keyname)=>{
        let{[keyname]: anyValue, ...res} = shows
        setShows(res);
    }

    const handleShowClickHandler = (keyname) =>{
        if(shows[keyname] ==  true)
            RemoveShowsFromObject(keyname)
        else
            setShows({
                ...shows,
                [keyname]:true
            })

        //f the input is closed then remove Error and Value from it
        RemoveErrorFromObject(keyname);
        RemoveValueFromObject(keyname);
    }

    //Handle Changes on input changes
    const handleChanges = (e) =>{
        const key = e.target.name;
        const value = e.target.value;

        //differnet way to handle image(file) from input
        if(key == 'image'){
            if (e.target.files && e.target.files.length > 0){
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

    const validateField = (keyName, value ) =>{
        if(value != ''){
            switch(keyName){
                case 'username':
                    if(value.length <=4)
                        setErrorWithMessage("username","Username atleast have 5 latters")
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
                    else if(!value.match(/^(?=.{1,15}$)[A-Za-z0-9]+$/)){
                        setErrorWithMessage("password", "Long password")
                    }
                    else{
                        RemoveErrorFromObject("password");
                    }
                    break;

                case 'repeat_password':
                    if(!value.match(/[A-Za-z0-9]/)){
                        setErrorWithMessage("repeat_password", "Incorect repeat password")
                    }
                    else if(!value.match(/^(?=.{1,15}$)[A-Za-z0-9]+$/)){
                        setErrorWithMessage("repeat_password", "Long password")
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
                    if(!value.match(/^(?=.{0,70}$)/)){
                        setErrorWithMessage('product_description', "Only 70 characters alowed")
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
            RemoveErrorFromObject(keyName); //remove the error when the last letter is deleted from the input
        }
    }


    
    //------------Submit Handlers--------------//
 
    const handleRegSubmit = (event) =>{
        event.preventDefault(); //no page reload

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
            
            callback(); 
        }
        else{
            addError("Incorrect input")
        }
    }

    const handleProductSubmit = (event) =>{
        event.preventDefault();

        if(values.product_name =='' || values.category =='' || values.product_price =='' || values.product_description =='' || !values.image){
            setEmptyFieldError();
            addError("Inputs can not be empty!!!");
            return
        }
        
        callback();
    }

    //difference between productSubmit and this edit is that Edit inputs don't have be all filled out
    //(exmaple you can fill ony one input not all of them)
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

    //edit only showned(opened) inputs
    const handleUserEditSubmit = (event) =>{
        if(Object.keys(values).length !=0){    
            //Entered values without errors
            let validValues = {};
            const updatedObject = {...shows}

            if(Object.keys(errors).length == 1){
                if(errors.username){
                    addError("Username " + errors.username);
                    return;
                }
    
                if(errors.email){
                    addError("Email " + errors.email);
                    return;
                }
                else if(errors.address){
                    addError("Address " + errors.address);
                    return;
                }
                else if(errors.phone_number){
                    addError("Phone number" + errors.phone_number);
                    return;
                }
            }
            else if(Object.keys(errors).length > 1){
                addError("Invalid inputs");
                return;
            }
            
            Object.keys(shows).forEach(key =>{
                //this won't take repeat_password because it is showing only on password click (there isn't show for repeat_password)
                console.log("Errorsss  ", errors);

                if(!errors[key] && values[key] !="" && values[key] !=undefined)
                {   
                    console.log("ERRORS KEY" , errors[key]);
                    if(key == 'password'){
                        if(values['password'] !== values['repeat_password']){
                            //can't set error on both in the different time(becase one will trigger re-rendering and another will be overrided)
                            // setErrorWithMessage("password", "Passwords aren't same")
                            // setErrorWithMessage('repeat_password', "Passwords aren't same")
                            //FIXED:set bot errors at the same time
                            setErrors((prev)=>{
                                return({
                                    ...prev,
                                    password:"Passwords aren't same",
                                    repeat_password:"Passwords aren't same"
                                })
                            })            
                        }
                        else{
                            validValues[key] = values[key];
                            validValues['repeat_password'] = values[key]
                            delete updatedObject[key]; //password = key
                        }
                    }
                    else{ 
                        validValues[key] = values[key];
                        delete updatedObject[key];
                    }           
                }
            })

            setShows(updatedObject);
            callback(validValues); 
        }   
        else{
            addError("Inputs are empty");
        }   
    }

    return {
        values,
        errors,
        shows,
        setEmptyFieldError,
        resetAllValues,
        RemoveValueFromObject,
        RemoveShowsFromObject,
        handleChanges,
        handleRegSubmit,
        handleProductSubmit,
        handleEditProductSubmit,
        handleShowClickHandler,
        handleUserEditSubmit
    }

}
export default useForm;
