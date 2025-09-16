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
                    <td id='products-td' data-cell="Products:">
                        {order.products.map(prod =>{
                            return (
                                <span className='product-item' key={prod.product ? prod.product._id : prod._id}>
                                    {prod.product!=null ? `${prod.product.name}  x${prod.amount}` : 'Deleted Product'}
                                </span>
                            )
                        })}
                    </td>
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
}

export default AdminOrderList