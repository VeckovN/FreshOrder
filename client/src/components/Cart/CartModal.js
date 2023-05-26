import Modal from '../UI/Modal/Modal';

const CartModal = ({itemsList,cartItems,totalAmount,orderCartItems, onClose, onCloseSignClick }) =>{

    //MODAL STRUCTURE
    const cartHeaderContext =
            'FreshOrder';

    const cartBodyContext =
            //props.children
        cartItems.length > 0      
            ? itemsList
            : <div className='no_items'>No Items in cart</div> 
    
    const cartFooterContext = 
            <>
                <div className='total_amount'>
                    TotalAmont: <span>{totalAmount}</span>
                </div>
                <div className='order'>
                    <button onClick={orderCartItems} id='Order'>Order</button>
                </div>
            </>
    return (
        //this onCloseModal handler is in parrent of Modal
        <Modal 
            HeaderContext = {cartHeaderContext}
            BodyContext = {cartBodyContext}
            FooterContext = {cartFooterContext}
            onCloseModal={onClose} 
            onCloseSignClick={onCloseSignClick}>
            {/* {cartItems.length >0      
                ? ItemsList
                : <div className='no_items'>No Items in cart</div> 
            } */}
        </Modal>
    )

}

export default CartModal