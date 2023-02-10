import {isValidElement, useState, useEffect, useContext} from 'react';
import axios from 'axios'

import notificationContext from '../../Store/notification-context';
import LoadingSpinner from '../../../utils/LoadingSpinner';

import Card from '../../UI/Card'


import './Profile.css'

const Profile = () =>{

    const {addSuccess, addError} = useContext(notificationContext);

    //We could create custom Hook like a useInput to manage this states for every Input 
    const [username, setUsername] = useState('');
    const [usernameShow, setUsernameShow] = useState(false);
    const [usernameError, setUsernameError] = useState('');

    // const {addSuccess, addError} = useContext(notificationContext);


//#region Instead of the one above we could have one useState with OBJECT
    // const [usernameState, setUsernameState] = useState(
    //     {state:
    //         {
    //             username: '',
    //             usernameShow:false,
    //             usernameError:''
    //         }
    //     });
    const [usernameState, setUsernameState] = useState({
        username:"",
        usernameShow:false,
        usernameError:""
    });
   
    //TRY THIS
    //Example set Show on diferent value and reset usernameError after that
    const usernameStateShowHandler = ()=>{

        //How This works without prevState=> (...prevState) ????
        setUsernameState({ 
            usernameShow:!usernameState.usernameShow
        })

        // usernameState.usernameError && setUsernameState({
        //     usernameError:''
        // })
    }
    const usernameStateChangeHandler = (event)=>{
        console.log('HEERE');

        //PROBLEM BECAUSE WE DONT HAVE PREV VALUE OF STATE
        // setUsernameState({
        //     username:'123'
        //     //should we overwrite 
        //     //usernameSHow and usernameError 
        //     //or this prop will be same as in pervious state
        // })   

        //SHOULD 'copy' prevState value into new object
        let value = event.target.value;
        setUsernameState(prevState=>({
            ...prevState,
            username:value
        }))
        console.log('USERNAME": ' + usernameState.username)
    }

//#endregion

    const [email, setEmail] = useState('');
    const [emailShow, setEmailShow] = useState(false);
    const [emailError, setEmailError] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberShow, setPhoneNumberShow] = useState(false)
    const [phoneNumberError, setphoneNumberError] = useState('');

    const [address, setAddress] = useState('');
    const [addressShow, setAddressShow] = useState(false);
    const [addressError, setaddressError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordError, setpasswordError] = useState('');

    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordShow, setRepeatPasswordShow] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState('');


    // //ONE CustomHook With Value, Error, Show Object for all Inputs
    // const [values, setValues] = useState({});
    // const [errors, setErros] = useState({});
    // const [show, setShow] = useState({});


    //State for fetching data
    const [fetchLoading, setFetchLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        username:'',
        email:'',
        address:'',
        phone_number:'',
    })
    const [fetchError, setFetchError] = useState('');

    const [reFetch, setReFetch] = useState(false);

//#region StateHandlers
    //Username
    const usernameShowHandler = ()=>{
        setUsernameShow(!usernameShow);
        usernameError && setUsernameError('')
    }
    const usernameChangeHandler = (event)=>{
        setUsername(event.target.value);
    }
    
    //Email
    const emailShowHandler = () =>{
        setEmailShow(!emailShow);
        emailError && setEmailError('');
    }
    const emailChangeHandler = (event)=>{
        setEmail(event.target.value);
    }

    //PhoneNumber
    const phoneNumberShowHandler = ()=>{
        setPhoneNumberShow(!phoneNumberShow);
        phoneNumberError && setphoneNumberError('');
    }
    const phoneNumberChangeHandler = (event)=>{
        setPhoneNumber(event.target.value);
    }

    //Address
    const addressShowHandler = ()=>{
        setAddressShow(!addressShow);
        addressError && setaddressError('');
    }
    const addressChangeHandler = (event)=>{
        setAddress(event.target.value);
    }

    //Passwords
    const passwordShowHandler = ()=>{
        setPasswordShow(!passwordShow);
        passwordError && setpasswordError('');
    }
    const passwordChangeHandler = (event)=>{
        setPassword(event.target.value);
        //only if exist password then show repeated input
    }
    //Repeated Password
    const repeatPasswordShowHanlder = () =>{
        setRepeatPasswordShow(!repeatPasswordShow);
        repeatPassword && setpasswordError('');
    }
    const repeatPasswordChangeHandler = (event)=>{
        setRepeatPasswordShow(event.target.value)
    }

//#endregion StatesHandlers


    //what user we show???
    //ID from localStorage
    const User = localStorage.getItem('user')
    const userID = JSON.parse(User)._id;

    //Fetch all data from current user and show it
    useEffect(()=>{
        //use Async function inside useEffect
        const fetchData = async ()=>{
            //proxy is included -> http://localhost:8800/api/ is proxy
            //http://localhost:8800/api/products/
            //const res = await axios.get('http://localhost:8800/api/products/');  
            try{
                const response = await axios.get(`users/${userID}`);  
                console.log("DATATATA:" + response.data._id);
                const res = response.data;
                // setUserInfo(state=> ({...state, username:res.username, email:res.data, address:res.address, phone_number:res.phone_number }))
                
                // !!!!! useFectc ERROR WITH userINfo as DEPENDECIES !!!!!!!!
                //THIS STATE CANT BE IN useEFFECT DEPENDECIES, Because this setUserInfo trigger re-rendering whcih is useEffect also reCalled,
                // again in useEffect is setUserInfo which will again invoke re-renderin and we Are IN INFINITY LOOP
                setUserInfo({
                    username:res.username, 
                    email:res.email, 
                    address:res.address, 
                    phone_number:res.phone_number 
                })         
                setFetchLoading(false);
            }catch(err){
                setFetchError(true);
                console.log(err);
            }
        }
    
        fetchData();

    }, [reFetch]); //fetch on every commit , When is user updated (setInfo state) we change this state reFetch
    
    const checkForCommit = ()=>{
        // if(usernameState.usernameShow && usernameState.username!='' || emailShow && email!='' || phoneNumberShow && phoneNumber!='' || addressShow && address!='' || passwordShow && password!='')
        // if(usernameShow && username!='' || emailShow && email!='' || phoneNumberShow && phoneNumber!='' || addressShow && address!='' || passwordShow && password!='')
        if(usernameShow && username!='' || emailShow && email!='' || phoneNumberShow && phoneNumber!='' || addressShow && address!='' || passwordShow && password!='')
            return true;
        else
            return false;

        
    }

    //validateFIlend based on passed object ({username:'novak123@!'} or {email:'novak@gmail.com})
    const validateField = (validateObject) =>{
        const keyName = String(Object.keys(validateObject));
        const value = String(Object.values(validateObject));
        console.log("KEYNAME: " + typeof(keyName) + ", VALUE: " + typeof(value) )
        switch(keyName){
            case 'username':
                let usernameValid = value.match(/^[a-zA-Z\-]+$/);
                return usernameValid;
                // console.log("USER:" + usernameValid);
                // break;
            case 'email':
                return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            case 'phone_number':
                // return value.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/);
                return value.match(/[0-9]{9,10}/);
            case 'address':
                return value.match(/[A-Za-z0-9'\.\-\s\,]/);
            case 'password':
                return value.match(/[A-Za-z0-9]/)
            case 'repeated_password':
                return value.match(/[A-Za-z0-9]/)
        }
    }

    //PREVENT DON'T REPEAT YOURSELF
    //USE object ={key, value} to put 'username': usernameValue
    //One function does same job as all other but dunamyc func parmeter
    const takeInputValue = (commitObject, inputStateObject , inputErrorState, setInputErrorState, setInputShowState) =>{
        
        const keyName = String(Object.keys(inputStateObject));
        const value = String(Object.values(inputStateObject));

        if(value!='') //value of InputStateObject
        {
            //!!!! CHECK username INPUT (Without signs @%!!@@8 and other unwanted words)
            // let validateObject = {'username': username};

            // const keyName = String(Object.keys(inputStateObject));
            // const value = String(Object.values(inputStateObject));
            // let validateObject = {'username': inputState};
            //inputStateObject is {'username':username}
            if(validateField(inputStateObject)){
                // commitObject.inputState = inputState;

                //all context from inputStateObject stored to commitObject with same key
                //this overwrite, but we need save all context of existed cimmitObject
                //commitObject = {commitObject ,...inputStateObject}

                //if key exists we overwrite it with new value, not add another object
                commitObject[keyName] = value; //result 'username or email...' = somevalue
                //commitObject.keyName = value; //result is 'keyName' = someValue we dont need this
                inputErrorState && setInputErrorState('');

                const objectStr = JSON.stringify(commitObject);
                console.log("INPUTOBJECT: " + objectStr);

                setInputShowState(false);
            }
            else{
                // setInputErrorState('No numbers and signs');
                // //based on KeyName - inputField
                switch(keyName){
                    case 'username':
                        setInputErrorState('No numbers and signs');
                        break;
                    case 'email':
                        setInputErrorState('Incorect Format, example:smt@gmail.com');
                        break;
                    case 'phone_number':
                        setInputErrorState("Between 9 and 10 digits");
                        break;
                    case 'address':
                        setInputErrorState("Incorect Address");
                        break;
                    case 'password':
                        setInputErrorState("Incorect password");
                        break;
                    case 'repeat_password':
                        setInputErrorState("Incorect repeated password");
                        break;
                }
            }
        }
        else{
            let errorStr = 'Enter ' + keyName; 
            setInputErrorState(errorStr);
        }
    
    }   

    const commitHandler = ()=>{
        //ALL INPUT VALUES ARE STORED IN THIS OBJECT
        //can be const because we change HIS PROPS HOW WHOLE OBJECT
        // let inputObject ={};
        const inputObject ={};

        //check for input commit
        usernameShow && takeInputValue(inputObject, {'username':username}, usernameError, setUsernameError, setUsernameShow);
        emailShow && takeInputValue(inputObject, {'email':email} , emailError, setEmailError, setEmailShow);
        phoneNumberShow && takeInputValue(inputObject, {'phone_number': phoneNumber}, phoneNumberError, setphoneNumberError, setPhoneNumberShow);
        addressShow && takeInputValue(inputObject, {'address': address}, addressError, setaddressError, setAddressShow);
        passwordShow && takeInputValue(inputObject, {'password': password}, passwordError, setpasswordError, setAddressShow);
        repeatPasswordShow && takeInputValue(inputObject, {'repeat_password':repeatPassword}, repeatPasswordError, setRepeatPasswordError);


        updateUser(inputObject);
        addSuccess("You have successfully updated your profile")
        // if(!errorInput){
        //     updateUser(inputObject);
        //     addSuccess("You have successfully updated your profile")
        // }
        // else{
        //     console.log("GHEEEEEEEE ERRRRRRRR");
        // }
    }

    const updateUser = async(user) =>{
        try{
            console.log("HEEEEEEEEEEE")
            //proxy doesn't works
            // const res = await axios.put(`users/updateuser/${userID}`, userJSON);
            const res = await axios.put(`http://localhost:8800/api/users/updateuser/${userID}`, user);
            // const data = await res.json();
            console.log("JSON REZ: " + JSON.stringify(res));
            //REFEACH Here
            // setReFetch(prevState=>(!prevState));
            setReFetch(prevState => !prevState);
        }
        catch(err){
            console.log(err);
        }
        http://localhost:8800/api/users/updateuser/635ba836ff04dc580230a964
        console.log("OBJECT:" + JSON.stringify(user));
    }

    let profileContext =   
        <div className='input_container'>
            <div className='input_field'>
                <div  onClick={usernameShowHandler}>Username: <span> {userInfo.username} </span></div>        
                {usernameShow && <input className={usernameError && 'errorInput'} onChange={usernameChangeHandler} id='username' type='text' placeholder='New username' name='username'/>}
                {/* {usernameError && <div className='errorInput'>{usernameError}</div>} */}
                {usernameError && <label className='errorInputLabel'>{usernameError}</label>}
            </div>

            <div className='input_field'>
                <div  onClick={emailShowHandler} >Email: <span>{userInfo.email}</span></div>
                {emailShow && <input className={emailError && 'errorInput'} onChange={emailChangeHandler} type='text' placeholder='New email' name='email'></input>}
                {emailError && <label className='errorInputLabel'>{emailError}</label>}
            </div>

            <div className='input_field'>
                <div  onClick={phoneNumberShowHandler}>PhoneNumber: <span>{userInfo.phone_number}</span></div>
                {phoneNumberShow && <input className={phoneNumberError && 'errorInput'} onChange={phoneNumberChangeHandler} type='number' placeholder='New Phone_number' name='phone_number'></input>}
                {phoneNumberError && <label className='errorInputLabel'>{phoneNumberError}</label>}
            </div>

            <div className='input_field'>
                <div onClick={addressShowHandler}>Address: <span>{userInfo.address}</span></div>
                {addressShow && <input className={addressError && 'errorInput'} onChange={addressChangeHandler}  type='text' placeholder='New Address' name='address'></input>}
                {addressError && <label className='errorInputLabel'>{addressError}</label>}
            </div>

            <div className='input_field'>
                <div onClick ={passwordShowHandler}>Password</div>
                {passwordShow && 
                <div>
                    <input onChange={passwordChangeHandler} type='password' placeholder='New password' name='password'></input> 
                    {passwordError && <label className='errorInputLabel'>{passwordError}</label>}
                    {/* //Only if password input exist then show repeatPassword */}
                    <div>Repeat Password</div>
                    <input onChange={repeatPasswordChangeHandler} type='password' placeholder='Repeat new password' name ='repeat_password'></input>
                    {repeatPasswordError && <label className='errorInputLabel'>{repeatPasswordError}</label>}
                </div>}
            </div>

            <div className='commit_container'>
                <button onClick={commitHandler} disabled={!checkForCommit()} className='commitButton'>Commit</button>
            </div>

            {/* <div className='edit_container'>
                <button onClick={editAll} className='editButton'>Edit</button>
            </div> */}   
        </div>

        


    return(
        <div className = "profile_container">
                {/* THIS COULD RENDER profileContext Component and Another Component For Loading Animation  */}
                {!fetchLoading ? 
                    <>    
                        <h2 className='profile_title'>Client Profile</h2>
                        {profileContext} 
                    </>
                : <div><LoadingSpinner/></div>}   
        </div>
    )

}

export default Profile