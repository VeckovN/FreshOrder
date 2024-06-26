
import {useNavigate } from 'react-router-dom';
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useContext} from 'react';

import NotificationContext from '../store/notification-context';
import AuthContext from '../store/auth-context';

//instance where the token is used
const axiosJWT = axios.create();

const useAxiosJWTInterceptors = ()=>{
    const {dispatchAction} = useContext(AuthContext);
    const {addError} = useContext(NotificationContext);
    const navigate = useNavigate();

    useEffect(() =>{
        const requestInterceptor = axiosJWT.interceptors.request.use( 
            async(config) =>{
                const user = JSON.parse(localStorage.getItem('user'));
                const currentDate = new Date();
                const decodedToken = jwtDecode(user.accessToken);

                //*1000 - convert to miliseconds, both need to be in the same units
                if(currentDate.getTime() >= decodedToken.exp *1000){
                    dispatchAction({type:"LOGOUT"}); 
                    addError("You're session time expired!"); 
                    navigate('/');
                    return Promise.reject(new Error("Session Expired"));
                }
                else{ //create new token and replace it with old one
                    const res = await axios.post('http://localhost:8800/api/auth/refresh', {token:user.accessToken });
                    const refresh_token = res.data.new_token;

                    //replace token in localStorage
                    user.accessToken = refresh_token
                    localStorage.setItem("user", JSON.stringify(user));
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