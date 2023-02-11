import react from 'react'

import pizzaCategoryImg from '../../assets/category/PizzaCategoryE.jpg'

const CartItem = props =>{

    

    return(
        <div className='cart_item'>
            {/* <img scr={props.image}></img> */}
            <img src={`products/${props.img_path}`} alt={props.name}></img>
            <div className='cart_info_container'>
                <div className='cart_info'>
                    <div>Name: <span>{props.name}</span></div>
                    <div>Price: <span>{props.price}$</span></div>
                    <div>Amount: <span>{props.amount}</span></div>
                    {/* <div>Description: <span>{props.description}</span></div> */}
                </div>
            </div>

            <div className='cart_buttons'>
                <button onClick={props.onIncrease} id='increase'>Increase</button>
                <button onClick={props.onDecrease} id='decrease'>Decrease</button>
            </div>
          
        </div>
    )
}

export default CartItem;