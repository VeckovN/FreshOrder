import React from 'react';

const ModalContext = React.createContext({
    showModal:false,
    typeModal:'', //type of modal ("Cart,Login,Register ...")
    
    //For Admin Order Delivery
    deliveryTimeInfo: null,
    // deliveryTimeInfo: action.payload
    productDeleteInfo: null //ProductId, headers, isChanges
})

export default ModalContext;