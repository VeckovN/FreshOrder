import {useContext} from 'react'
import CartItem from './CartItem';
import cartContext from '../../store/cart-context';
import authContext from '../../store/auth-context';
import modalContext from '../../store/modal-context.js'
import notificationContext from '../../store/notification-context.js'

import CartModal from './CartModal';
import './Cart.css'

const Cart = () =>{
    const {user} = useContext(authContext);
    const ctxCart = useContext(cartContext);
    const ctxModal = useContext(modalContext);

    const cartItems = ctxCart.items;
    const totalAmount = ctxCart.amountTotal;
    const convertedTotalAmount = totalAmount.toFixed(2).concat('$'); //only positive value with 2 decimals
    
    const Loading = ctxCart.orderLoading;

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
    <div className='item-list'>
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

    return (
        <CartModal
            cartItems={cartItems}
            itemsList={ItemsList}
            totalAmount={convertedTotalAmount}
            orderCartItems={orderCartItems}
            onClose={ctxModal.closeModal}
        />
        
    )

}

export default Cart; 

