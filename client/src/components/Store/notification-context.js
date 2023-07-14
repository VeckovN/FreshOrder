import React from 'react';

const NotificationContext = React.createContext({
    // list:[
    //     //with state 
    //     // {
    //     //     id:'0'
    //     //     title: 'Product Deleting'
    //     //     description: 'You have been deleted the product'
    //     //     type: 'error or success or warning'
    //     // }
    // ],

    success:'',
    error:'',
    addError: (message)=>{},
    removeError: ()=>{},
    addSuccess: (message)=>{},
    removeSuccess: ()=>{},
    removeNotification:()=>{}

})

export default NotificationContext;