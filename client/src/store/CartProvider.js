import {useReducer} from 'react'
import {axiosJWT} from '../services/axiosJWTInstance';
import CartContext from "./cart-context";


const InitialCartState = {
    items:[],
    amountTotal: 0,
    // orderLoading:false
}

const ReducerCart = (state,action) =>{

    if(action.type ==='AddItem'){

        //if item exists we don't want to add it as the new one
        //we want to increase amount of this existing item

        //find if this item exists in our Array of items
        const indexOfExistingItem = state.items.findIndex(item => item.id === action.item.id)
        const itemFound = state.items[indexOfExistingItem];

        let newItems;

        if(itemFound){
            const newItemForUpdate = {
                ...itemFound,
                amount: itemFound.amount + action.item.amount
            }
            newItems =[...state.items];
            newItems[indexOfExistingItem] = newItemForUpdate;
        }
        else{
            const newItemForUpdate = {
                ...action.item,
                amount: action.item.amount
                }
            newItems=[...state.items, newItemForUpdate];

            const lastIndex = newItems.length-1; 
        }
            
        const newAmount = state.amountTotal + action.item.amount * action.item.price; 
    
        return{
            items: newItems,
            amountTotal: newAmount,
        }
    }


    if(action.type === "DecreaseItem"){

        //if the item amount is 1 next action will remove item from the cart
        const indexOfExistingItem = state.items.findIndex(item => item.id === action.id)
        const itemFound = state.items[indexOfExistingItem];

        let newItems;
        newItems =[...state.items];
        if(itemFound.amount > 1){
            const newItem = {
                ...itemFound,
                amount: itemFound.amount - 1
            }

            newItems[indexOfExistingItem] = newItem;
        }
        else{
            newItems.splice(indexOfExistingItem, 1);
        }

        //action.id
        const totalAmount= state.amountTotal - itemFound.price;

        return {
            items:newItems,
            amountTotal: Math.abs(totalAmount)
        }
    }

    if(action.type === "IncreaseItem"){

        const indexOfExistingItem = state.items.findIndex(item => item.id === action.id)
        const itemFound = state.items[indexOfExistingItem]; 
        
        let newItems;
        if(itemFound){
            const newItem ={...itemFound, amount: itemFound.amount + 1 }
            newItems = [...state.items];
            newItems[indexOfExistingItem] = newItem;   
        }

        const totalAmount = state.amountTotal + itemFound.price * 1

        return{
            items:newItems,
            amountTotal: totalAmount
        }
    }

    if(action.type = "OrderItems"){
        //from auth -> logged user
        const userInfo = JSON.parse(localStorage.getItem('user'));
        
        if(userInfo){
            const ID = userInfo._id;
            if(state.items.length>0)
            {
                const products = state.items.map(item =>{
                    return {product:item.id, amount:item.amount}
                })

                const Order = {
                    user:ID, //in schema user prop instaed of thisID
                    products:products
                }
            
                const User = localStorage.getItem('user');
                const accessToken = User.accessToken;
                const headers = {
                    'authorization' : "Bearer " + accessToken
                };
                
                axiosJWT.post('http://localhost:8800/api/orders', Order, {headers})
                .then((res)=>{
                })
                .catch((err)=>{
                    console.error(err);
                })
            } 
            else{
                console.error("No Products in cart");
            }
        }
        else{
            alert("Login to order food!!!")
            
            //return the current Items and Cart amountTotal 
            return {
                items:state.items,
                amountTotal:state.amountTotal
            }
        }   
    }

    //return defaut State
    return InitialCartState;
}


const CartProvider = props =>{

    const [cartState, dispatchAction] =useReducer(ReducerCart, InitialCartState);

    const addItemToCartHandler = item =>{
        dispatchAction({type:'AddItem', item:item})
    }

    const decreaseItemFromCartHandler = id =>{
        dispatchAction({type:'DecreaseItem', id:id})
    }

    const increaseAmountHandler = id =>{
        dispatchAction({type:'IncreaseItem', id:id})
    }
    
    const orderItemsHandler = () =>{
        dispatchAction({type:'OrderItems'});
    }

    // const loadingOrderHandler = () =>{
    //     dispatchAction({type:'OrderLoading'});
    // }

    // const successOrderHandler = ()=>{
    //     dispatchAction({type:'OrderSuccess'});
    // }

    //same structure as cart-context.js
    const cartContext = {
        items: cartState.items,
        amountTotal: cartState.amountTotal,
        // addItemToCart: (item) =>{},
        addItemToCart: addItemToCartHandler,
        decreaseItemFromCart: decreaseItemFromCartHandler,
        increaseAmount: increaseAmountHandler,
        orderItems:orderItemsHandler,
        // orderLoading:loadingOrderHandler,
        // orderSuccess:successOrderHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider;