import { convertDate } from "../../utils/Helper";
const OrdersTable = (props)=>{
    return(
        
        <ul className='table'>
            <li className ='table-header' >
                <div className='column col-1'>Product</div>
                <div className='column col-2'>Amount</div>
                <div className='column col-3'>TotalPrice</div>
                <div className='column col-4'>Status</div>
                <div className ='column col-5'>Created</div>
            </li>
            {props.orders.map(order =>{
                console.log("ORDE:"+ order._id);
                    let totalPrice =0;
                    const completed = order.isCompleted ? 'table-row-complited' : 'table-row'
                    // return <li className='table-row' key={order._id}>
                    return <li className={completed} key={order._id}>
                                {/* A pending order will be able to be cancelled  --- orderID is returend to parrent */}
                                {/* {!order.isCompleted && <button onClick={onCancelHandler(order._id)} className='cancel_order'>CANCEL</button>} */}
                                {!order.isCompleted && <button onClick={ () =>{props.onCancel(order._id);}} className='cancel_order'>CANCEL</button>}
                                {/* <FontAwesomeIcon icon="fa-solid fa-trash" /> */}
                                
                                <div className ='column col-1'>
                                    {order.products.map(prod =>{
                                    return <p className='prod_item'>{prod.product!=null ? prod.product.name : 'Deleted Product'}</p>
                                    })}
                                </div>
                                <div className ='column col-2'>  
                                        {order.products.map(prod =>{
                                            totalPrice+=prod.amount * prod.product?.price;
                                            return <p className='prod_item'>{prod.amount}</p>
                                        })}
                                    {/* {order.products.map(prod =>{
                                        totalAmount+=prod.product.amount * prod.product.price;
                                        <p>{prod.product.amount}</p>
                                    })} */}
                                </div>
                                <div className ='column col-3'>{totalPrice.toFixed(2)}€</div>
                                <div className ='column col-4'>{order.isCompleted ? <p>Completed</p> : <p>Pending</p>}</div>
                                <div className ='column col-5'><div className='dateLabel'>{convertDate(order.createdAt).day} {convertDate(order.createdAt).hour}</div></div>
                        </li>
            })}
        </ul> 
    )
}

export default OrdersTable;