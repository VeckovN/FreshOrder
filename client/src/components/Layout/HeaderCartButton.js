import {useState, useContext, useEffect} from 'react';
import cartContext from '../../store/cart-context';
import modalContext from '../../store/modal-context';
import './HeaderCartButton.css'

const HeaderCartButton = () =>{

    const ctxCart = useContext(cartContext);
    const ctxModal = useContext(modalContext);
    const [buttonBlink, setButtonBlink] = useState(false);

    //On Every click on add items in cart button, this cartIcon should blink and 
    //change the amount of items in cart
    const items = ctxCart.items;

    let totalAmountOfItems = 0;
    for(let i=0 ; i<items.length; i++)
        totalAmountOfItems += items[i].amount;
    
    useEffect( ()=>{
        //we won't blink effect on first render 
        if(items.length !== 0)
            setButtonBlink(true);

        //for 300ms turn on false after 
        const timer = setTimeout(() =>{
            setButtonBlink(false);
            //this will avoke cssChange(cartBlink)
        }, 300);

        //cleanup function(delete this funtion on the end) beacese evert rerendering create unique timer
        return() =>{
            clearTimeout(timer);
        }

    },[items])


    const cartBlink = `cartButton ${buttonBlink ? 'blink' : ''}`
   
    //different css style when is item added in cart(blink icon)
    //set class to button on every 
    return <button className={cartBlink} onClick={()=> ctxModal.showCart()}>
        <img src='/shopping-cart-1.png' alt='image'></img>
        <div className='badge'>{totalAmountOfItems}</div>
    </button>
}

export default HeaderCartButton 