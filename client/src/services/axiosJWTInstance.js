
import {useNavigate } from 'react-router-dom';
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useContext} from 'react';

import NotificationContext from '../components/Store/notification-context';
import AuthContext from '../components/Store/auth-context';

//instance where the token is used
const axiosJWT = axios.create();

//this function must be called somewhere before the first request(which need token time check) sent
//maybe in App.js or on every Component which use this axiosJWT instance
const useAxiosJWTInterceptors = ()=>{
    const {user, dispatchAction} = useContext(AuthContext);
    const {addError} = useContext(NotificationContext);

    useEffect(() =>{
        const requestInterceptor = axiosJWT.interceptors.request.use( 
            async(config) =>{
                const User = JSON.parse(localStorage.getItem('user'));
                let currentDate = new Date();
                const decodedToken = jwtDecode(User.accessToken);
                //alert("Curent time: " + currentDate.getTime()  + "   tokenTiem: " + decodedToken.exp*1000)
                if(currentDate.getTime() >= decodedToken.exp *1000){
                    dispatchAction({type:"LOGOUT"}); //this will change user state ande triger re-rendering
                    addError("You're session time expired!"); 
                }
                else{ //create new token and replace it with old one
                    const res = await axios.post('http://localhost:8800/api/auth/refresh', {token:User.accessToken });
                    console.log("REFSRTESH TOKEN " + JSON.stringify(res.data));
                    const refresh_token = res.data.new_token;
                    //replace token in localStorage
                    User.accessToken = refresh_token
                    localStorage.setItem("user", JSON.stringify(User));
                    //set new Token in header for ror the incoming request
                    config.headers["authorization"] = "Bearer " + refresh_token;  //update header
                }
                return config;
            },
            (error)=>{
                return Promise.reject(error);
            }
        )

        return()=>{
            //cleanup function to eject the interceptor when the component unmounts. 
            //This ensures that the interceptor is removed when it's no longer needed, preventing memory leaks.
            axiosJWT.interceptors.request.eject(requestInterceptor);
        }
    }, [])
}

//axiosJWT is instance and every request on it will run defined interceptor()
export {axiosJWT, useAxiosJWTInterceptors}