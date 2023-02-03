
const OrdersTable = (props)=>{

    return(
        <ul className='table'>
            <li className ='table-header'>
                {/* <div className='colone col-1'>OR ID</div> */}
                <div className='colone col-1'>Product</div>
                <div className='colone col-2'>Amount</div>
                <div className='colone col-3'>TotalPrice</div>
                <div className='colone col-4'>Status</div>
                <div className ='colone col-5'>Created</div>
            </li>
            {props.orders.map(order =>{
                console.log("ORDE:"+ order);
                    let totalPrice =0;
                    const completed = order.isCompleted ? 'table-row-complited' : 'table-row'
                    // return <li className='table-row' key={order._id}>
                    return <li className={completed} key={order._id}>
                                {/* A pending order will be able to be cancelled  --- orderID is returend to parrent */}
                                {/* {!order.isCompleted && <button onClick={onCancelHandler(order._id)} className='cancel_order'>CANCEL</button>} */}
                                {!order.isCompleted && <button onClick={ () =>{props.onCancel(order._id);}} className='cancel_order'>CANCEL</button>}
                                {/* <FontAwesomeIcon icon="fa-solid fa-trash" /> */}
                                
                                <div className ='colone col-1'>
                                    {order.products.map(prod =>{
                                    return <p className='prod_item'>{prod.product.name}</p>
                                    })}
                                </div>
                                <div className ='colone col-2'>  
                                        {order.products.map(prod =>{
                                            totalPrice+=prod.amount * prod.product.price;
                                            return <p className='prod_item'>{prod.amount}</p>
                                        })}
                                    {/* {order.products.map(prod =>{
                                        totalAmount+=prod.product.amount * prod.product.price;
                                        <p>{prod.product.amount}</p>
                                    })} */}
                                </div>
                                <div className ='colone col-3'>{totalPrice.toFixed(2)}€</div>
                                <div className ='colone col-4'>{order.isCompleted ? <p>Complited</p> : <p>Pending</p>}</div>
                                <div className ='colone col-5'>22.11.2022 11:34</div>
                        </li>
            })}
        </ul> 
    )
}

export default OrdersTable;