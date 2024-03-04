import Modal from '../UI/Modal/Modal';

const CartModal = ({itemsList,cartItems,totalAmount,orderCartItems, onClose}) =>{

    const cartHeaderContext =
            'FreshOrder';

    const cartBodyContext =
        cartItems.length > 0      
            ?  <div className='cart-context'>
                    <div className='cart-items'>
                        {itemsList}
                    </div>
                    <div className='bottom-context '>
                        <div className='total-amount'>
                            TotalAmont: <span>{totalAmount}</span>
                        </div>
                        <div className='order'>
                            <button onClick={orderCartItems} id='Order'>Order</button>
                        </div>
                    </div>
                </div>
            : <div className='no-items'>No Items in cart</div> 
    
    return (
        <Modal 
            ModalContainerStyle='cartModal'
            HeaderContext = {cartHeaderContext}
            BodyContext = {cartBodyContext}
            onCloseModal={onClose} 
        />
    )

}

export default CartModal