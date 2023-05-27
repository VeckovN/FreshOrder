import {useState} from 'react'
import { convertDate } from '../../../../../utils/Helper';

const AdminOrderList = ({orders, onComfirmOrder}) =>{

    return (
        <>
            <li className ='table_header'>
                {/* <div className='colone col-1'>OR ID</div> */}
                <div className='colone col-1'>Username</div>
                <div className='colone col-2'>Email</div>
                <div className='colone col-3'>Product</div>
                <div className='colone col-4'>Amount</div>
                <div className='colone col-5'>TotalPrice</div>
                <div className='colone col-6'>Status</div>
                <div className='colone col-7'>Created</div>
            </li>
            {orders.map(order =>{
                console.log("ORDE:"+ order);
                    let totalPrice =0;
                    const completed = order.isCompleted ? 'table-row completed' : 'table-row'
                    return <li className={completed}  key={order._id}>
                                {!order.isCompleted && <button className="comfirm_button" onClick={() =>{onComfirmOrder(order._id, order.user.email);}}>Comfirm</button>}
                                
                                <div className='colone col-1'>
                                    {/* {order._id} */}
                                    {order.user ? order.user.username : "username"}
                                </div>
                                <div className='colone col-2'>
                                    {order.user ? order.user.email : "emailAdr@gmail.com"}
                                </div>
                                <div className ='colone col-3'>
                                    {order.products.map(prod =>{
                                    //when is product deleted , in order it will be targeted as 'Deleted'
                                    return <p>{prod.product!=null ? prod.product.name : 'Deleted Product'}</p>
                                    })}
                                </div>
                                <div className ='colone col-4'>  
                                        {order.products.map(prod =>{
                                            //prod.product.price could be null -(when is product deleted)
                                            //?. return undentified when is price null 
                                            totalPrice+=prod.amount * prod.product?.price;
                                            return <p>{prod.amount}</p>
                                        })}
                                </div>
                                <div className ='colone col-5'>{totalPrice}</div>
                                <div className ='colone col-6'>{order.isCompleted ? <p>Completed</p> : <p>Pending</p>}</div>
                                <div className ='colone col-7'><div className='dateLabel'>{convertDate(order.createdAt).day} {convertDate(order.createdAt).hour}</div></div>
                        </li>
                })}
            </>

    )
}

export default AdminOrderList