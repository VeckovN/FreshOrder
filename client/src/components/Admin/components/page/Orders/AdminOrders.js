import {useState, useEffect} from 'react'
import axios from 'axios';

import '../../../../Page/Orders/Orders.css'
import './AdminOrders.css'

const AdminOrders = (props)=>{

    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        getOrders();
    },[])

    const getOrders = async ()=>{
        // const res = await axios.get('');
        try{
            const res = await axios.get('http://localhost:8800/api/orders')
            const data = res.data;
            setOrders(data);
        }
        catch(err){
            console.log(err);
        }
    }  

    const onComfirmOrder = (orderID,userEmail)=>{
        // alert("Ts: " + orderID);

        const deliveryInfo = {
            orderID:orderID,
            userEmail:userEmail
        }
        
        //pass value to MODAL(which is called in APP.js)
        props.onEnterOrderDeliveryTime(deliveryInfo);

    }

    console.log("ORDERS INFO: " + JSON.stringify(orders));

    console.log("\n USERE:\n" + JSON.stringify(orders.user))

    return(
        <div className="table_container">
            <h1> User Orders </h1>
                <ul className='table_order'>
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
                            const completed = order.isCompleted ? 'table-row-complited' : 'table-row'
                            // return <li className='table-row' key={order._id}>
                            return <li className={completed} key={order._id}>
                                        {/* {!order.isCompleted && <button className="comfirm_button" onClick={onComfirmOrder(order._id)}>Comfirm</button>} */}
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
                                            return <p>{prod.product.name}</p>
                                            })}
                                        </div>
                                        <div className ='colone col-4'>  
                                                {order.products.map(prod =>{
                                                    totalPrice+=prod.amount * prod.product.price;
                                                    return <p>{prod.amount}</p>
                                                })}
                                            {/* {order.products.map(prod =>{
                                                totalAmount+=prod.product.amount * prod.product.price;
                                                <p>{prod.product.amount}</p>
                                            })} */}
                                        </div>
                                        <div className ='colone col-5'>{totalPrice}</div>
                                        <div className ='colone col-6'>{order.isCompleted ? <p>Complited</p> : <p>Pending</p>}</div>
                                        <div className ='colone col-7'>22.11.2022 11:34</div>
                                </li>
                    })}
                </ul> 
        </div>
    )
    
}

export default AdminOrders;