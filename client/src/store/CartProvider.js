import {useState, useReducer, useEffect, useContext} from 'react'
import { axiosJWT } from '../services/axiosJWTInstance';
import CartContext from "./cart-context";


const InitialCartState = {
    items:[],
    //items:[],
    amountTotal: 0,
    // orderLoading:false
}

const ReducerCart = (state,action) =>{
    //state.items is items array of our state
    //action.item is the item passed through dispatchMethod in CartProvider

    if(action.type ==='AddItem'){

        //if item exists we don't want to add his as new item
        //we want to increase amount of this existing item

        //1. find does this item exists in our Array of items
        const indexOfExistingItem = state.items.findIndex(item => item.id === action.item.id)
        const itemFound = state.items[indexOfExistingItem];

        console.log("ITEM EX: " + indexOfExistingItem);
        let newItems;

        if(itemFound){
            //const itemFound = state.items[indexOfExistingItem];
            const newItemForUpdate = {
                ...itemFound,
                amount: itemFound.amount + action.item.amount
            }

            newItems =[...state.items];
            newItems[indexOfExistingItem] = newItemForUpdate;

            console.log("SAWW: " + newItems[indexOfExistingItem].name + " Item Amount:" + newItems[indexOfExistingItem].amount);
        }
        else{
            const newItemForUpdate = {
                ...action.item,
                amount: action.item.amount
                }
            newItems=[...state.items, newItemForUpdate];

                
            const lastIndex = newItems.length-1; 
            console.log("ITEM NOT EXISTS: "+ newItems[lastIndex].amount + ' ////ITEM NAME: ' + newItems[lastIndex].name);
        
        }
            
        const newAmount = state.amountTotal + action.item.amount * action.item.price; 
    
        console.log("total Amount: " + newAmount);
        //console.log("NAME: " +state.items[1].name);

        // //RETURN NEW STATE ON THIS ACTION
        return{
            items: newItems,
            amountTotal: newAmount,
        }
    }


    if(action.type === "DecreaseItem"){

        //if is amount of item 1 next action wiil be removing
        //this item from array
        const indexOfExistingItem = state.items.findIndex(item => item.id === action.id)
        const itemFound = state.items[indexOfExistingItem];

        let newItems;
        newItems =[...state.items];
        if(itemFound.amount > 1){
            const newItem = {
                ...itemFound,
                amount: itemFound.amount - 1
            }

            // newItems = [...state.items];
            newItems[indexOfExistingItem] = newItem;
        }
        else{
            //remove item from array
            // newItems =[...state.items];
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
        //CALL API FUNC
        //take products from cart 

        //structure of object for backend
        //{
        //     "userID": "635ba836ff04dc580230a964", ->type:mongoose.Types.ObjectId, ref="User"
        //     "products":[
        //         {
        //             "product":"6359734b0abd5b6771c9845e", ->type:mongoose.Types.ObjectId, ref="Product"
        //             "amount":2 -> Type:Number
        //         },
        //         {
        //             "product":"63595879835e201be6fa15eb",
        //             "amount":3
        //         }
        //     ]
        // }


        //from auth -> logged user
        const userInfo = JSON.parse(localStorage.getItem('user'));
        // const ID = userInfo._id;

        console.log(userInfo);

        // const id = '123123212';
        //state.items.map(item => products.add({product:item.name, amount:item.amount}))
        
        if(userInfo){
            const ID = userInfo._id;
                //foreach returns 'undefined' but .map returns array
            if(state.items.length>0)
            {
                const products = state.items.map(item =>{
                    return {product:item.id, amount:item.amount}
                })
                //this also could be handle like this
                //var products = [];
                // state.items.forEach(item =>{
                //     products.push({product:item.name, amount:item.amount})
                // })

                const Order = {
                    //IN SCHEMA is user propr INSTEAD THIS userID
                    // userID:ID, 
                    user:ID,
                    // products:products
                    products:products
                }
                console.log("OREDRRR:" + Order);
            
                const User = localStorage.getItem('user');
                const accessToken = User.accessToken;
                const headers = {
                    'authorization' : "Bearer " + accessToken
                };
                axiosJWT.post('http://localhost:8800/api/orders', Order, {headers})
                .then((res)=>{
                    console.log(res);
                })
                .catch((err)=>{
                    console.log(err);
                })

            } 
            else{
                //Notificaton context action called
                // alert("No products in cart")
                console.log("No Products in cart");
            }
        }
        else{
            alert("Login to order food!!!")
            
            //return the current Items and amountTotal OF Cart
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
        //ALL LOGIC IS IN REDUCER FUNCTION WHICH WILL BE RECOGNIZED BY THIS ARGUMENT OF DISPATCHMETHOD
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