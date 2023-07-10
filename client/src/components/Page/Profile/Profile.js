import {useState, useEffect, useContext} from 'react';
import axios from 'axios'

import notificationContext from '../../Store/notification-context';
import LoadingSpinner from '../../../utils/LoadingSpinner';

import useForm from '../../../utils/Hooks/useForm';
import ProfileContext from './ProfileContext';
import Card from '../../UI/Card'


import './Profile.css'

const Profile = () =>{

    const {addSuccess, addError} = useContext(notificationContext);


    // callback(validValues) in useForm (user is validValues)
    const onUpdateUser = async(user) =>{
        try{
            console.log("USSEERRR: " + JSON.stringify(user));

            const res = await axios.put(`http://localhost:8800/api/users/updateuser/${userID}`, user);            
            let updatedKeys = '';   
            let length = Object.keys(user).length;
            // //get all keys of updated props
            console.log("USERSsssss: " + JSON.stringify(user));
            if(length > 0)
            {
                Object.keys(user).forEach((key, index)=>{
                    console.log("!!!!!!! : " + key);
                    if(index != length-1)
                        updatedKeys+= key + ", "
                    else
                        updatedKeys+= key;
                        //if is the last key there ins't + for next key
                })
                    //setReFetch val
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
        // //http://localhost:8800/api/users/updateuser/635ba836ff04dc580230a964
        // console.log("OBJECT:" + JSON.stringify(user));
    }

    //updateUser as callback which will be call after submit validation
    // const {values, errors, shows, handleChanges, handleSubmit, onClickShowHandler} = useForm(updateUser);
    const initialInputObject = {
        username:"", 
        email:"", 
        address:"", 
        phone_number:"" 
    }
    
    const [fetchLoading, setFetchLoading] = useState(true);
    //User(props) profile info
    const [userInfo, setUserInfo] = useState({
        username:"", 
        email:"", 
        address:"", 
        phone_number:""
    })
    const [reFetch, setReFetch] = useState(true);
    const User = localStorage.getItem('user')
    const userID = JSON.parse(User)._id;

    const {values, errors, shows, handleChanges, handleShowClickHandler, handleUserEditSubmit} = useForm(initialInputObject, onUpdateUser);

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
                const password_length = JSON.parse(User).password_length;
                setUserInfo(state=> ({...state, username:res.username, email:res.email, address:res.address, phone_number:res.phone_number, password_length }))
                setFetchLoading(false);
                console.log("FETCH LOADING: " + fetchLoading);
                console.log("DATA: " +JSON.stringify(res));
            }catch(err){
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

    return(
        <div className = "profile_container">
                {/* THIS COULD RENDER profileContext Component and Another Component For Loading Animation  */}
                
            {!fetchLoading ? 
                    <>    
                        <h2 className='profile_title'>Client Profile</h2>
                        {/* {profileContext}  */}
                        <ProfileContext
                            userInfo={userInfo} //user Data info
                            values={values} //inputFrom values
                            errors={errors}
                            shows={shows}
                            // commitHandler={commitHandler}
                            commitHandler = {handleUserEditSubmit}
                            handleChanges={handleChanges}
                            checkForCommit={checkForCommit}
                            onClickShowHandler={handleShowClickHandler}
                        />
                    </>
                : <div><LoadingSpinner/></div>}   
        </div>
    )

}

export default Profile