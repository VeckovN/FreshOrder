import './CartItem.css';

const CartItem = props =>{
    return(
        <div className='cart-item'>
            <img src={`products/${props.img_path}`} alt={props.name}></img>
            <div className='cart-info-container'>
                <div className='cart-info'>
                    <div>Name: <span>{props.name}</span></div>
                    <div>Price: <span>{props.price}$</span></div>
                    <div>Amount: <span>{props.amount}</span></div>
                </div>
            </div>

            <div className='cart-buttons'>
                <button onClick={props.onIncrease} id='increase'>Increase</button>
                <button onClick={props.onDecrease} id='decrease'>Decrease</button>
            </div>
        </div>
    )
}

export default CartItem;