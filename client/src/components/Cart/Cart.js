import {useContext} from 'react'

import cartContext from '../Store/cart-context';
import CartItem from './CartItem';

import authContext from '../Store/auth-context';
import notificationContext from '../Store/notification-context.js'

import CartModal from './CartModal';
import './Cart.css'

const Cart = props =>{

    const {user} = useContext(authContext);
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
        if(user){
            if(cartItems.length >0){
                ctxCart.orderItems(); 
                addSuccess("You have successfully ordered")
            }
            else
                addError("You can't order empty cart");
        }
        else
            addError("You must be logged in")
    }

    const ItemsList = 
    <div className='item_list' >
                {cartItems.map(item =>
                    <CartItem 
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        amount={item.amount}
                        img_path={item.img_path}
                        description={item.description}
                        onDecrease = {decreaseCartItemAmount.bind(null, item.id)}
                        onIncrease = {increseCartItemAmount.bind(null, item.id)}                 
                    />
                )}
    </div>

    console.log("CARTTT");
    return (
        <CartModal
            cartItems={cartItems}
            itemsList={ItemsList}
            totalAmount={convertedTotalAmount}
            orderCartItems={orderCartItems}
            onClose={props.onClose}
            onCloseSignClick={props.onCloseCart}
        />
        
    )

}

export default Cart; 

