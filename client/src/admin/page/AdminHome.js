import AdminOrders  from './Orders/AdminOrders.js'
import './AdminHome.css'

const AdminHome = () =>{
    return(
        <main className='mainAdmin'>
            <AdminOrders />
        </main>
    )
}

export default AdminHome;