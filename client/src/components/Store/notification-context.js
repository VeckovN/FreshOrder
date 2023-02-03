import React from 'react';

const NotificationContext = React.createContext({
    success:'',
    error:'',
    addError: (message)=>{},
    removeError: ()=>{},
    addSuccess: (message)=>{},
    removeSuccess: ()=>{},
    removeNotification:()=>{}

})

export default NotificationContext;