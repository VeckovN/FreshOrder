import {useState} from 'react'
// import Users from './Users/Users.js'
import AdminOrders  from './Orders/AdminOrders.js'

import './AdminHome.css'


const AdminHome = (props) =>{
    return(

        <main className='mainAdmin'>
            {/* this handler show modal (userModal) adminUserModalUpdate */}
            {/* onEnterOrderDeliveryTime(orderID) from AdminOrders */}
            <AdminOrders onEnterOrderDeliveryTime={props.onOrderDeliveryTime}/>
            {/* <Users onEditUserUpdateHandler={props.onUserEditUpdate}/> */}
        </main>
    )
}

export default AdminHome;