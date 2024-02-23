import {useState} from 'react';

//useFromSelect Hook used for validation, which by clicking on a certain label after
//which the input is displayed and enables data entry


//callback function when we wanna submit 
//we also can check for submit in our component(without passing callback and doing here)
const useForm = (submitCallback)=>{

    //values,errors and show  object for all inputs
    const [values, setValues] = useState({});  //valuse={username:'novak', email:'novak@gmail.com'}
    const [errors, setErrors] = useState({});
    const [shows, setShows] = useState({});

    const RemoveErrorFromObject = (keyName) =>{
         let {[keyName]: omit, ...res} = errors
         setErrors(res);
     }
     const RemoveValueFromObject = (keyName) =>{
         let {[keyName]: omit, ...res} = values
         setValues(res);
     }
     const RemoveShowFromObject = (keyName) =>{
         let {[keyName]: omit, ...res} = shows
         setShows(res);
     }


    const handleChanges = (e) =>{
        const key = e.target.name;
        const value = e.target.value;
        if(value!=''){
            validateField(key,value);
            setValues({
                ...values,
                [key]:value
            })
        }
        else 
            RemoveValueFromObject(key);
    }
    // when is Div clicked -> show or hide it
    const onClickShowHandler = (keyName) =>{
        //set true if ins't clicked or delete it from shows object if it is
        if(shows[keyName] == true)
            RemoveShowFromObject(keyName)
        else
            setShows({
                ...shows,
                [keyName]:true
            })

        RemoveErrorFromObject(keyName);
        //also delete input value from closed input
        RemoveValueFromObject(keyName);
    }

    const handleSubmit =  async(e) =>{
        console.log("VALUES COUINT: " + Object.keys(values).length)
        console.log("\n ERRORS : " + Object.keys(errors) === 0)

        //if there isn't input with empty value and errrors
        if(Object.keys(values).length != 0){
            //updateUser form Profile.js (values is object of entered values)
            //await will secure that this function will be executed
            const submitResponse = await submitCallback(values);

            console.log("SUBMIT RESPONSE : " + submitResponse?.errorMessage)

            //only when is not undefined (?.) 
            //(where there ins't error this errorMessage not exists)
            if(!submitResponse?.errorMessage){
                console.log("SSSSSSSSSSSSS");
                //close all submited input filed
                Object.keys(shows).forEach(key =>{
                    RemoveShowFromObject(key)
                })
                return true;
            }
            else
            {
                setErrorWithMessage('global', submitResponse.errorMessage);
                return false;
            }
        }
        else{
            // setErrorWithMessage('global')
            return false;
        }
    }
    
    console.log("\n VALUES : " + JSON.stringify(values));
    console.log("\n ERRORS " + JSON.stringify(errors));
    console.log("\n SHOWS " + JSON.stringify(shows));


    const setErrorWithMessage = (keyName,errorMessage) =>{
        setErrors({
            ...errors,
            //keyName:errorMessage not allowed, this keyName is prop but it must be String
            [keyName]:errorMessage
            //this is allowed
        })
    }

    const validateField = (keyName, value ) =>{
        console.log("KEYNAME: " + typeof(keyName) + ", VALUE: " + typeof(value) )

        if(value != ''){
            switch(keyName){
                case 'username':
                    // let usernameValid = value.match(/^[a-zA-Z\-]+$/);
                    if(value.length <=4)
                        setErrorWithMessage("username","Username atleast have 5 latters")
                    else if(!value.match(/^[a-zA-Z\-]+$/)){
                        setErrorWithMessage("username","No numbers and Sign")
                    }
                    else{
                        //Delete Errors from object (errors may exist in object and it must be deleted)
                        RemoveErrorFromObject("username");
                        // RemoveErrorFromObject("username");

                        //This will close input field
                        //setShowFalseInput("username");
                        //we SHOULD ONLY CLOSE FIELD ONLY WHEN IS SHOWED
                    }
                    break;
                case 'email':
                    if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                        setErrorWithMessage("email","Enter a valid email address")
                    }
                    else{
                        RemoveErrorFromObject("email");
                        // setShowFalseInput("email");
                    }
                    break;

                case 'phone_number':
                    if(!value.match(/[0-9]{9,10}/)){
                        setErrorWithMessage("phone_number", "Between 9 and 10 digits")
                    }
                    else{
                        RemoveErrorFromObject("phone_number");
                        // setShowFalseInput("phone_number");
                    }
                    break;

                case 'address':
                    // if(value =='')
                    //     setErrorWithMessage("address", "Enter address")
                    if(!value.match(/[A-Za-z0-9'\.\-\s\,]/)){
                        setErrorWithMessage("address", "Incorrect Address")
                    }
                    else{
                        RemoveErrorFromObject("address");
                        // setShowFalseInput("address");
                    }
                    break;

                case 'password':
                    if(!value.match(/[A-Za-z0-9]/)){
                        setErrorWithMessage("password", "Incorect Password")
                    }
                    else{
                        RemoveErrorFromObject("password");
                        // setShowFalseInput("password");
                    }
                    break;

                case 'repeat_password':
                    if(!value.match(/[A-Za-z0-9]/)){
                        setErrorWithMessage("repeat_password", "Incorect repeat password")
                    }
                    else{
                        RemoveErrorFromObject("repeat_password");
                        // setShowFalseInput("repeat_password");
                    }
                    break;

                default:
                    break;
            }
        }
        else{
            console.log("HEEEEEEERRRRR ORRR");
            setErrorWithMessage(keyName, "Enter value")
        }
    }

    return{
        values,
        errors,
        shows,
        handleChanges,
        handleSubmit,
        onClickShowHandler,
        
    }
}

export default useForm;