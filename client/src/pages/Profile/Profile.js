import {useState, useEffect, useContext} from 'react';
import axios from 'axios' //used for Non Authenticated users
import {axiosJWT} from '../../services/axiosJWTInstance';

import useForm from '../../hooks/useForm';
import notificationContext from '../../store/notification-context';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ProfileContext from './ProfileContext';

import './Profile.css'

const Profile = () =>{

    const {addSuccess, addError} = useContext(notificationContext);
    // callback(validValues) in useForm (user is validValues)
    const onUpdateUser = async(user) =>{
        try{
            const headers = {
                'authorization' : "Bearer " + userAccessToken
            };

            await axios.put(`http://localhost:8800/api/users/updateuser/${userID}`, user, {headers});            
            let updatedKeys = '';   
            let length = Object.keys(user).length;
            // //get all keys of updated props
            if(length > 0)
            {
                Object.keys(user).forEach((key, index)=>{
                    if(index != length-1)
                        updatedKeys+= key + ", "
                    else
                        updatedKeys+= key;
                })
                addSuccess('You updated: ' + updatedKeys)
                setReFetch(prevState => !prevState);
            }
            else
                addError("Invalid inputs");
        }
        catch(err){
            //if exist error send from NODEJS as new Error(error.message , error.status)
            if(err.response.data && err.response.data.message)
            {
                console.log("ERROROR" + err.response.data.message);
                addError(err.response.data.message);
            }
            else
                console.log("An error occurred : " + err);
        }
    }

    //updateUser as callback which will be call after submit validation
    const initialInputObject = {
        username:"", 
        email:"", 
        address:"", 
        phone_number:"" 
    }
    const [userInfo, setUserInfo] = useState({
        ...initialInputObject
    })
    
    const [fetchLoading, setFetchLoading] = useState(true);
    const [reFetch, setReFetch] = useState(true);

    const User = JSON.parse(localStorage.getItem('user'));
    const userID = User._id;
    const userAccessToken = User.accessToken

    const {values, errors, shows, handleChanges, handleShowClickHandler, handleUserEditSubmit} = useForm(initialInputObject, onUpdateUser);

    //Fetch all data from current user and show it
    useEffect(()=>{
        const fetchData = async ()=>{
            //proxy is included -> http://localhost:8800/api/ is proxy  
            try{
                const headers = {
                    'authorization' : "Bearer " + userAccessToken
                };
                //This route use verifyUser(token verification) that we need to send user token through header                
                const response = await axiosJWT.get(`users/${userID}`, {headers}); 
                //in verifyToken we access to token wiht header.authorization then take token with spilt
                const res = response.data;
                const password_length = User.password_length;
                setUserInfo(state=> ({...state, username:res.username, email:res.email, address:res.address, phone_number:res.phone_number, password_length }))
                setFetchLoading(false);
            }catch(err){
                console.log(err);
            }
        }
    
        fetchData();
    }, [reFetch]); //fetch on every commit , When is user updated (setInfo state) we change this state reFetch
    
    const checkForCommit = ()=>{
        if(shows.username && values.username!=undefined || shows.email && values.email!=undefined || shows.phone_number && values.phone_number!=undefined || shows.address && values.address!=undefined || shows.password && values.password!=undefined && errors)
            return true;
        else
            return false;
    }

    return(
        <div className = "profile-container">
            <div className='profile-title'>My Profile</div>
                {!fetchLoading 
                ?    
                <ProfileContext
                    userInfo={userInfo} //user Data info
                    values={values} //inputFrom values
                    errors={errors}
                    shows={shows}
                    commitHandler = {handleUserEditSubmit}
                    handleChanges={handleChanges}
                    checkForCommit={checkForCommit}
                    onClickShowHandler={handleShowClickHandler}
                />
                : <LoadingSpinner/>}   
        </div>
    )

}

export default Profile