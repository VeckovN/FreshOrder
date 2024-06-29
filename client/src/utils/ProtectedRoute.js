import React from 'react';
import {Navigate} from 'react-router-dom';

//return this component if is authenticated if not return redirect to '/'
    const ProtectedRoute = ({children, navigate, isAdmin}) =>{ //navigate is props from <ProtectedRoute navigate='/'/>
    const user = JSON.parse(localStorage.getItem('user')); //this return value of 'user' key which is object {user} if exists or STRING 'null' if not exists
    if(!user )
        return <Navigate to={navigate}/> 
    if(isAdmin && !user.isAdmin)
        return <Navigate to={navigate}/> 
    return children;
}   

export default ProtectedRoute;