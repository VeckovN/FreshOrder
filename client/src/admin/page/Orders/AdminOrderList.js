import { convertDate } from '../../../utils/Helper';
import "./AdminOrderList.css"

const AdminOrderList = ({orders, onConfirmOrder}) =>{

    return(
        <table className="orders_table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Product</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
            {orders.map(order =>{
                const totalPrice = order.products.reduce((total, prod) =>{
                    return total + (prod.amount * (prod.product?.price || 0));
                }, 0);
                const pending = !order.isCompleted ? 'pending-tr' : ''

                return <tr className={pending} key={order._id}>
                    <td data-cell="Username:">{order.user ? order.user.username : "username"}</td>
                    <td data-cell="Email:">{order.user ? order.user.email : "emailAdr@gmail.com"}</td>
                    <td data-cell="Address:">{order.user ? order.user.address : "address"}</td>
                    <td id='products-td' data-cell="Products:">{order.products.map(prod =>{
                            return <p>{prod.product!=null ? `${prod.product.name}  x${prod.amount}` : 'Deleted Product'}</p>
                        })}</td>

                    <td data-cell="Total:">{totalPrice.toFixed(2)}$</td>    
                    <td data-cell="Status">{order.isCompleted ? <p>Done</p> : <p>Pending</p>}</td>     
                    <td data-cell="CreatedAt:">
                        <div>{convertDate(order.createdAt).day}</div>
                        <div>{convertDate(order.createdAt).hour}</div>
                    </td>
                    
                    {!order.isCompleted && 
                    <td className='button-td' data-cell="Button">
                        <button className="confirm_button" onClick={() =>{onConfirmOrder(order._id, order.user.email);}}>Confirm</button>
                    </td>
                    }
                </tr>
            })}
                
            </tbody>
        </table>
    )

    // return (
    //     <ul className='table-ul'>
    //         <li className ='table_header'>
    //             <div className='colone col-1'>Username</div>
    //             <div className='colone col-2'>Email</div>
    //             <div className='colone col-3'>Address</div>
    //             <div className='colone col-4'>Product</div>
    //             <div className='colone col-5'>Total</div>
    //             <div className='colone col-6'>Status</div>
    //             <div className='colone col-7'>Created</div>
    //         </li>
    //         {orders.map(order =>{
    //                 const totalPrice = order.products.reduce((total, prod) =>{
    //                     return total + (prod.amount * (prod.product?.price || 0));
    //                 }, 0);
    //                 const completed = order.isCompleted ? 'table-row completed' : 'table-row'
    //                 return <li className={completed}  key={order._id}>
    //                             {!order.isCompleted && <button className="confirm_button" onClick={() =>{onConfirmOrder(order._id, order.user.email);}}>Confirm</button>}
                                
    //                             <div className='colone col-1'>
    //                                 {/* {order._id} */}
    //                                 {order.user ? order.user.username : "username"}
    //                             </div>
    //                             <div className='colone col-2'>
    //                                 {order.user ? order.user.email : "emailAdr@gmail.com"}
    //                             </div>
    //                             <div className ='colone col-3'>  
    //                                 {order.user ? order.user.address : "address"}
    //                             </div>
    //                             <div className ='colone col-4'>
    //                                 {order.products.map(prod =>{
    //                                 return <p>{prod.product!=null ? `${prod.product.name}  x${prod.amount}` : 'Deleted Product'}</p>
    //                                 })}
    //                             </div>
    //                             <div className ='colone col-5'>{totalPrice.toFixed(2)}</div>
    //                             <div className ='colone col-6'>{order.isCompleted ? <p>Completed</p> : <p>Pending</p>}</div>
    //                             <div className ='colone col-7'><div className='dateLabel'>{convertDate(order.createdAt).day} {convertDate(order.createdAt).hour}</div></div>
    //                     </li>
    //             })}
    //         </ul>
    // )
}

export default AdminOrderList