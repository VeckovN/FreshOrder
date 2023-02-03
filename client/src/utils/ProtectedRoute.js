import React from 'react';
import {Redirect, Navigate, Route} from 'react-router-dom';


//chidren is passed component between <ProtectedRoute> HERE </ProtectedRoute>
//return this component if is authenticated if not return redirect to '/'
    const ProtectedRoute = ({children, navigate, isAdmin}) =>{ //navigate is props from <ProtectedRoute navigate='/'/>
    const user = JSON.parse(localStorage.getItem('user')); //this return value of 'user' key which is object {user} if exists or STRING 'null' if not exists
    console.log("this", typeof(user));
    //We got null as a string , to check if value in LocalStorage is null we cant with !user (because 'null' string exists)

    console.log("ADMIN: " + user.isAdmin)
    if(!user ){
        return <Navigate to={navigate}/>
    }
    if(isAdmin && !user.isAdmin){
        return <Navigate to={navigate}/>
    }
    
    return children;
}   


export default ProtectedRoute;