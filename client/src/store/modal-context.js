import React from 'react';

const ModalContext = React.createContext({
    showModal:false,
    typeModal:'', //type of modal ("Cart,Login,Register ...")
    

    deliveryTimeInfo: null,
    productDeleteInfo: null, //ProductId, headers, isChanges
    userInfo:null, //admin edit modal (when is user users's edit button clicked)
})

export default ModalContext;