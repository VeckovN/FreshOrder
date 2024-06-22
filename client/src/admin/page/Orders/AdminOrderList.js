import { convertDate } from '../../../utils/Helper';

const AdminOrderList = ({orders, onConfirmOrder}) =>{
    return (
        <ul className='table-ul'>
            <li className ='table_header'>
                <div className='colone col-1'>Username</div>
                <div className='colone col-2'>Email</div>
                <div className='colone col-3'>Address</div>
                <div className='colone col-4'>Product</div>
                <div className='colone col-5'>Total</div>
                <div className='colone col-6'>Status</div>
                <div className='colone col-7'>Created</div>
            </li>
            {orders.map(order =>{
                    const totalPrice = order.products.reduce((total, prod) =>{
                        return total + (prod.amount * (prod.product?.price || 0));
                    }, 0);
                    const completed = order.isCompleted ? 'table-row completed' : 'table-row'
                    return <li className={completed}  key={order._id}>
                                {!order.isCompleted && <button className="confirm_button" onClick={() =>{onConfirmOrder(order._id, order.user.email);}}>Confirm</button>}
                                
                                <div className='colone col-1'>
                                    {/* {order._id} */}
                                    {order.user ? order.user.username : "username"}
                                </div>
                                <div className='colone col-2'>
                                    {order.user ? order.user.email : "emailAdr@gmail.com"}
                                </div>
                                <div className ='colone col-3'>  
                                    {order.user ? order.user.address : "address"}
                                </div>
                                <div className ='colone col-4'>
                                    {order.products.map(prod =>{
                                    return <p>{prod.product!=null ? `${prod.product.name}  x${prod.amount}` : 'Deleted Product'}</p>
                                    })}
                                </div>
                                <div className ='colone col-5'>{totalPrice.toFixed(2)}</div>
                                <div className ='colone col-6'>{order.isCompleted ? <p>Completed</p> : <p>Pending</p>}</div>
                                <div className ='colone col-7'><div className='dateLabel'>{convertDate(order.createdAt).day} {convertDate(order.createdAt).hour}</div></div>
                        </li>
                })}
            </ul>

    )
}

export default AdminOrderList