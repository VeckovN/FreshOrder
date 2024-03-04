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

    const {user} = useContext(AuthContext);
    const {showAdminOrderDelivery} = useContext(modalContext);
    const headers = configureHeader(user.accessToken);
    const firstRender = useRef(true);
    
    useEffect(()=>{
        //This will prevent to not render on INITIAL 
        //after first Fetch in getdataPerPage this firstRender will become true
        getDataPerPage();
        getTotalOrders(sort); //for each request get TotalOrders wiht sort options
        console.log("FIRST NOW");
    },[itemsPerPage, sort])


    //On initial Redner (only once)
    // useEffect(()=>{
    //     getDataPerPage();
    //     getTotalOrders(sort);
    //     console.log("FIRSTTTTTTTTTTTTTT");
    // },[])
  
    //But on running the app, you will realize that the text is shown even before the button is clicked(itemsPerpage and sort). 
    //The reason? Well, useEffect’s callback function gets called not only when one of the dependencies 
    //changes but also during the initial render.
    //THIS WILL ALSO BE RUN ON INTIAL RENDER AS [] BUT ANOTHER TIME WILL BE
    //RENDER ONLY ON itemsPerPage or sort state change
    // useEffect(()=>{
    //     //This will prevent to not render on INITIAL 
    //     //after first Fetch in getdataPerPage this firstRender will become true
    //     if(firstRender.current == false){ 
    //         getDataPerPage();
    //         getTotalOrders(sort); //for each request get TotalOrders wiht sort options
    //         console.log("SECOOOOOOOND");
    //     }
    // },[itemsPerPage, sort])

    //OnEvery paggination page click
    const getDataPerPage = async (pageNumber)=>{
        try{
            //on initial it's true
            setIsLoading(true)
            const res = await axiosJWT.get(`http://localhost:8800/api/orders?page=${pageNumber}&limit=${itemsPerPage}&sort=${sort.status}`, {headers})
            const data = res.data;

            const timer = setTimeout(()=>{
                setIsLoading(false);
                setOrders(data);
                setCurrentPage(pageNumber);
                //prevent to Only useEffect[] run on intial
                firstRender.current = false;
            }, 500);

            //remove timer after timeout (ofc this function will be run in useEffect)
            return() =>{
                clearTimeout(timer);
            }
        }
        catch(err){
            console.log(err);
            //stop Loding Spinner on error
            setIsLoading(false);
        }
    }

    const getTotalOrders = async (sort) =>{
        try{
            const res = await axiosJWT.get(`http://localhost:8800/api/orders/count?sort=${sort.status}`, {headers});
            const data = res.data;
            setTotalOrders(data.count);
            console.log("ORDERS NUMB: " + data.count);
        }   
        catch(err){
            console.log(err);
        }
    }

    const onComfirmOrder = (orderID,userEmail)=>{
        const deliveryInfo = {
            orderID:orderID,
            userEmail:userEmail,      
        }
        showAdminOrderDelivery(deliveryInfo);
    }

    const loadingTheme = isloading ? 'table_context_loading' : ''
    return(
        <div className="table_container">
            <h1> User Orders </h1>
            <div className='table_order'>
                {isloading && <LoadingSpinner/>}
                <div className='table_filter'>
                    <div className='table_filter_option'>
                        <label>Items per Page</label>
                        <div className='table_perPage_buttons'>
                            <button className={itemsPerPage=='5' && 'selected'} onClick={() => {setItemsPerPage('5')}}>5</button>
                            <button className={itemsPerPage=='10' && 'selected'} onClick={() => {setItemsPerPage('10')}}>10</button>
                            <button className={itemsPerPage=='15' && 'selected'} onClick={() => {setItemsPerPage('15')}}>15</button>
                        </div>
                    </div>

                    <div className='table_filter_option'>
                        <label>Status sort {sort.status && `: ${sort.status}`}</label>
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
                        onComfirmOrder={onComfirmOrder}
                    />
                </div>
            </div> 
            {!isloading 
                && <Pagination 
                        itemsPerPage={itemsPerPage} 
                        totalItems={totalOrders} 
                        onPageNumberSelect={getDataPerPage} 
                        currentPage={currentPage ? currentPage : '1'} 
                    />
            }
        </div>
    )
    
}

export default AdminOrders;