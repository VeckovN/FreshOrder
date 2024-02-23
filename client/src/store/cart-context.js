import React from 'react';

const CartContext = React.createContext({
    items:[],
    amountTotal:0,
    orderLoading:false,
    addItemToCart: (item) =>{},
    decreaseItemFromCart: (id) => {},
    increaseAmount: (id) =>{},
    orderItems: ()=>{},
    // orderLoading: ()=>{},
    // orderSuccess: ()=>{}
})

export default CartContext;