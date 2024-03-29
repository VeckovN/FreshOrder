import {useState, useEffect, useContext} from 'react';
import { axiosJWT } from '../../services/axiosJWTInstance.js';
import OrdersTable from './OrdersTable.js';

import notificationContext from '../../store/notification-context.js';
import authContext from '../../store/auth-context.js';
import LoadingSpinner from '../../utils/LoadingSpinner.js';
import './Orders.css'

const Orders = () =>{

    const [orders, setOrders] = useState('');
    const [loading, setLoading] = useState(true);

    const {user} = useContext(authContext);
    const {addSuccess, addError} = useContext(notificationContext);

    const userInfo = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        const fetchAllUserOrders = async()=>{
            try{
                const res = await axiosJWT.get(`http://localhost:8800/api/orders/userOrders/${userInfo._id}`,{
                    headers:{ "authorization":"Bearer " + user.accessToken}
                })
                const data = res.data;
                const orders = data[0].orders;
                setOrders(orders);
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllUserOrders();
    },[])

    const onCancelOrderHandler = async(orderID)=>{
        //orderID taken from OrdersTable children comp
        try{
            const res = await axiosJWT.delete(`http://localhost:8800/api/orders/${orderID}/${user._id}`, {
                headers:{ "authorization":"Bearer " + user.accessToken}
            })
            const dataResponse = res.data;
            //trigger ony state to re-render order - more costs then delete this order from ordersLIST state

            //delete orderID order from current orders state
            const newOrders = orders.filter(order => order._id != orderID);
            setOrders(newOrders);
            addSuccess(dataResponse);
        }catch(err){
            console.log(err);
            addError("You can't delete order");
        }
    }

    return (
        <div className='container-table'>
            <h2>{userInfo.username}'s Orders</h2>
            {!loading ?
                orders.length > 0
                ? 
                <OrdersTable orders={orders} onCancel={onCancelOrderHandler}/> 
                :
                <div className='no_orders'>No orders for <span>{userInfo.username}</span></div>
            :
            <LoadingSpinner/>
            }
        </div>
    )
}

export default Orders;