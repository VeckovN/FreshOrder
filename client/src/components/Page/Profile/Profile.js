import {isValidElement, useState, useEffect, useContext, useDebugValue} from 'react';
import axios from 'axios'

import notificationContext from '../../Store/notification-context';
import LoadingSpinner from '../../../utils/LoadingSpinner';

import useForm from '../../../utils/Hooks/useFormSelect';
import ProfileContext from './ProfileContext';
import Card from '../../UI/Card'


import './Profile.css'

const Profile = () =>{

    const {addSuccess, addError} = useContext(notificationContext);

    const updateUser = async(user) =>{
        try{
            console.log("UPDATEEEEEEEEEEEEEEEEEEEssssssssssss");
            //proxy doesn't works
            const res = await axios.put(`http://localhost:8800/api/users/updateuser/${userID}`, user);

            console.log("JSON REZ: " + JSON.stringify(res));
            setReFetch(prevState => !prevState);
        }
        catch(err){
            //return next(createError(404, 'Username exists')); cretatError returns new Error
            console.log(err.response.data);
            return {errorMessage:err.response.data.message}
        }
        http://localhost:8800/api/users/updateuser/635ba836ff04dc580230a964
        console.log("OBJECT:" + JSON.stringify(user));
    }

    //updateUser as callback which will be call after submit validation
    const {values, errors, shows, handleChanges, handleSubmit, onClickShowHandler} = useForm(updateUser);


    const [fetchLoading, setFetchLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        username:'',
        email:'',
        address:'',
        phone_number:'',
    })
    const [fetchError, setFetchError] = useState('');
    const [reFetch, setReFetch] = useState(false);

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
        if(shows.username && values.username!=undefined || shows.email && values.email!=undefined || shows.phone_number && values.phone_number!=undefined || shows.address && values.address!=undefined || shows.password && values.password!=undefined)
            return true;
        else
            return false;
    }

    const commitHandler = async()=>{
        //handleSubmit is async
        const submit =  await handleSubmit(); //from useForm hook

        console.log("SUBMIT: " + JSON.stringify(submit));

        submit ? addSuccess("You have successfully updated your profile")  
            : addError(errors.global)     
    }


    return(
        <div className = "profile_container">
                {/* THIS COULD RENDER profileContext Component and Another Component For Loading Animation  */}
                {!fetchLoading ? 
                    <>    
                        <h2 className='profile_title'>Client Profile</h2>
                        {/* {profileContext}  */}
                        <ProfileContext
                            userInfo={userInfo}
                            errors={errors}
                            shows={shows}
                            commitHandler={commitHandler}
                            handleChanges={handleChanges}
                            checkForCommit={checkForCommit}
                            onClickShowHandler={onClickShowHandler}
                        />
                        
                    </>
                : <div><LoadingSpinner/></div>}   
        </div>
    )

}

export default Profile