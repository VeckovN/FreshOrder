import {useState, useEffect, useRef, useContext} from 'react'
import { axiosJWT } from '../../../services/axiosJWTInstance';
import Pagination from '../../../utils/Pagination/Pagination';
import LoadingSpinner from '../../../utils/LoadingSpinner';
import AuthContext from '../../../store/auth-context';
import modalContext from '../../../store/modal-context.js';
import { configureHeader } from '../../../utils/Helper.js';
import AdminOrderList from './AdminOrderList';

import '../../../pages/Orders/Orders.css';
import './AdminOrders.css'
//https://medium.com/swlh/prevent-useeffects-callback-firing-during-initial-render-the-armchair-critic-f71bc0e03536

const AdminOrders = ()=>{

    const [isloading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [totalOrders,  setTotalOrders] = useState();
    const [itemsPerPage, setItemsPerPage] = useState('5');
    const [currentPage, setCurrentPage] = useState('1');
    const [sort, setSort] = useState({});
    const firstRender = useRef(true);

    const {user} = useContext(AuthContext);
    const {showAdminOrderDelivery} = useContext(modalContext);
    const headers = configureHeader(user.accessToken);
    
    useEffect(()=>{
        //This will prevent to not render on INITIAL 
        //after first Fetch in getdataPerPage this firstRender will become true
        getDataPerPage();
        getTotalOrders(sort); //for each request get TotalOrders wiht sort options
    },[itemsPerPage, sort])

    //OnEvery paggination page click
    const getDataPerPage = async (pageNumber)=>{
        try{
            setIsLoading(true)
            const res = await axiosJWT.get(`/api/orders?page=${pageNumber}&limit=${itemsPerPage}&sort=${sort.status}`, {headers})
            const data = res.data;

            setIsLoading(false);
            setOrders(data);
            setCurrentPage(pageNumber);

            if(!firstRender.current)
                window.scrollTo({ behavior: 'smooth', top: 0 });

            firstRender.current = false;
        }
        catch(err){
            console.error(err);
            setIsLoading(false);
        }
    }

    const getTotalOrders = async (sort) =>{
        try{
            const res = await axiosJWT.get(`/api/orders/count?sort=${sort.status}`, {headers});
            const data = res.data;
            setTotalOrders(data.count);
        }   
        catch(err){
            console.error(err);
        }
    }

    const onConfirmOrder = (orderID,userEmail)=>{
        const deliveryInfo = {
            orderID:orderID,
            userEmail:userEmail,      
        }
        showAdminOrderDelivery(deliveryInfo);
    }

    const loadingTheme = isloading ? 'table_context_loading' : ''
    return(
        <div className="table_container">
            <h2> User Orders </h2>
            <div className='table_order'>
                {isloading && <LoadingSpinner/>}
                <div className='table_filter'>
                    <div className='table_filter_option'>
                        <label>Items per Page</label>
                        <div className='table_perPage_buttons'>
                            <button className={itemsPerPage=='5' ? 'selected' : ''} onClick={() => {setItemsPerPage('5')}}>5</button>
                            <button className={itemsPerPage=='10' ? 'selected' : ''} onClick={() => {setItemsPerPage('10')}}>10</button>
                            <button className={itemsPerPage=='15' ? 'selected' : ''} onClick={() => {setItemsPerPage('15')}}>15</button>
                        </div>
                    </div>

                    <div className='table_filter_option'>
                        <label>Sort Status</label>
                        <div className='table_sort_buttons'>
                            {sort.status !='notCompleted' 
                                ?
                                <button onClick={()=>{setSort( {status:'notCompleted'} )}}>NoCompleted</button>
                                :
                                <button className='selected' onClick={()=>{setSort({})}}>NoCompleted</button> 
                            }

                            {sort.status !='completed' 
                                ? 
                                <button onClick={()=>{setSort( {status:'completed'} )}}>Completed</button> 
                                :
                                <button className='selected' onClick={()=>{setSort({})}}>Completed</button> 
                            }

                        </div>
                        
                    </div>
                </div>
                <div className={`table_context ${loadingTheme}`}>
                    <AdminOrderList
                        orders={orders}
                        onConfirmOrder={onConfirmOrder}
                    />
                </div>
            </div> 
            {totalOrders > 0 && !firstRender.current &&  (
                <Pagination 
                        itemsPerPage={itemsPerPage} 
                        totalItems={totalOrders} 
                        onPageNumberSelect={getDataPerPage} 
                        currentPage={currentPage ? currentPage : '1'} 
                    />
            )
            }
        </div>
    )
    
}

export default AdminOrders;