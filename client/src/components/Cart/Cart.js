import {useContext} from 'react'

import cartContext from '../Store/cart-context';
import CartItem from './CartItem';

import notificationContext from '../Store/notification-context.js'


import Modal from '../UI/Modal';

import './Cart.css'

//MODAL

const Cart = props =>{


    const ctxCart = useContext(cartContext);

    const cartItems = ctxCart.items;
    const itemExists = cartItems.length;

    const totalAmount = ctxCart.amountTotal;
    const convertedTotalAmount = totalAmount.toFixed(2).concat('$'); //only positive value with 2 decimals
    
    const Loading = ctxCart.orderLoading;
    console.log("AMOUNT TOTAL: "+ ctxCart.amountTotal);

    const {addSuccess, addError} = useContext(notificationContext);

    const increseCartItemAmount = id =>{
        ctxCart.increaseAmount(id);
    } 

    const decreaseCartItemAmount = id =>{
        ctxCart.decreaseItemFromCart(id);
    }

    const orderCartItems = () =>{
        if(cartItems.length >0){
            ctxCart.orderItems(); 
            addSuccess("You have successfully ordered")
        }
        else
            addError("You can't order empty cart");

    }
    const ItemsList = 
    <div className='item_list' >
                {cartItems.map(item =>
                    <CartItem 
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        amount={item.amount}
                        description={item.description}
                        onDecrease = {decreaseCartItemAmount.bind(null, item.id)}
                        onIncrease = {increseCartItemAmount.bind(null, item.id)}                 
                    />
                )}
    </div>


    //MODAL STRUCTURE
    const cartHeaderContext =
            'FreshOrder';

    const cartBodyContext =
            //props.children
        cartItems.length > 0      
            ? ItemsList
            : <div className='no_items'>No Items in cart</div> 
    
    const cartFooterContext = 
            <>
                <div className='total_amount'>
                    TotalAmont: <span>{convertedTotalAmount}</span>
                </div>
                <div className='order'>
                    <button onClick={orderCartItems} id='Order'>Order</button>
                </div>
            </>



    // //Order func
    // const orderProducts = (e) =>{
    //     //e.preventDefault();
    //     alert("You have to been logged")
    // }
            
            
            
    console.log("CARTTT");
    return (
        //this onCloseModal handler is in parrent of Modal
        <Modal 
            HeaderContext = {cartHeaderContext}
            BodyContext = {cartBodyContext}
            FooterContext = {cartFooterContext}
            onCloseModal={props.onClose} 
            onCloseSignClick={props.onCloseCart}>
            {/* {cartItems.length >0      
                ? ItemsList
                : <div className='no_items'>No Items in cart</div> 
            } */}
        </Modal>
        
    )
    // <div>TotalAmount: {convertedTotalAmount}</div>

}

export default Cart; 

