import {useState, useEffect, useRef, useCallback} from 'react'
import Pagination from '../../../../../utils/Pagination/Pagination';
import LoadingSpinner from '../../../../../utils/LoadingSpinner';
import AdminOrderList from './AdminOrderList';
import {convertDate} from '../../../../../utils/Helper.js'
import axios from 'axios';

import '../../../../Page/Orders/Orders.css'
import './AdminOrders.css'

//https://medium.com/swlh/prevent-useeffects-callback-firing-during-initial-render-the-armchair-critic-f71bc0e03536

const AdminOrders = (props)=>{

    const [isloading, setIsLoading] = useState(false);

    const [orderChange, setOrderChange] = useState(false);

    const [orders, setOrders] = useState([]);
    const [totalOrders,  setTotalOrders] = useState();
    const [itemsPerPage, setItemsPerPage] = useState('5');
    const [currentPage, setCurrentPage] = useState('1');
    const [sort, setSort] = useState({});
    // const timeoutRef = useRef();

    const firstRender = useRef(true);
    
    //On initial Redner (only once)
    useEffect(()=>{
        getDataPerPage();
        getTotalOrders();
        console.log("FIRSTTTTTTTTTTTTTT");
    },[])
  

    //But on running the app, you will realize that the text is shown even before the button is clicked(itemsPerpage and sort). 
    //The reason? Well, useEffect’s callback function gets called not only when one of the dependencies 
    //changes but also during the initial render.

    //THIS WILL ALSO BE RUN ON INTIAL RENDER AS [] BUT ANOTHER TIME WILL BE
    //RENDER ONLY ON itemsPerPage or sort state change
    useEffect(()=>{
        //This will prevent to not render on INITIAL 
        //after first Fetch in getdataPerPage this firstRender will become true
        if(firstRender.current == false){ 
            getDataPerPage();
            console.log("SECOOOOOOOND");
        }
    },[itemsPerPage, sort])

    //OnEvery paggination page click
    const getDataPerPage = async (pageNumber)=>{
        try{
            console.log('GET DATA PER PAGE');
            //on initial it's true
            setIsLoading(true)
            const res = await axios.get(`http://localhost:8800/api/orders?page=${pageNumber}&limit=${itemsPerPage}&sort=${sort.status}`)
            const data = res.data;

            //In useEffect Becase useTimer has to be deleted
            //timer on IsLoading state

            //This should be custom Hook
            const timer = setTimeout(()=>{
                setIsLoading(false);
                //affter loader is gone then show data
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


    const getTotalOrders = async () =>{
        try{
            const res = await axios.get('http://localhost:8800/api/orders/count');
            const data = res.data;
            setTotalOrders(data.count);
            console.log("ORDERS NUMB: " + data.count);
        }   
        catch(err){
            console.log(err);
        }
    }

    const onComfirmOrder = (orderID,userEmail)=>{
        // alert("Ts: " + orderID);
        const deliveryInfo = {
            orderID:orderID,
            userEmail:userEmail,
            
        }
        //pass value to MODAL(which is called in APP.js)
        props.onEnterOrderDeliveryTime(deliveryInfo);
    }

    //console.log("ORDERS INFO: " + JSON.stringify(orders));
    //console.log("\n USERE:\n" + JSON.stringify(orders.user))

    const loadingTheme = isloading ? 'table_context_loading' : ''
    return(
        <div className="table_container">
            <h1> User Orders </h1>
            <ul className='table_order'>
                {isloading && <LoadingSpinner/>}
                <li className='table_filter'>
                    <div className='table_perPage_select'>
                        {/* <label>Items per Page {`: ${itemsPerPage}`}</label> */}
                        <label>Items per Page</label>
                        {/* this will re-render component wiht new itemsPerPage */}
                        <div className='table_perPage_buttons'>
                            <button className={itemsPerPage=='5' && 'selected'} onClick={() => {setItemsPerPage('5')}}>5</button>
                            <button className={itemsPerPage=='10' && 'selected'} onClick={() => {setItemsPerPage('10')}}>10</button>
                            <button className={itemsPerPage=='15' && 'selected'} onClick={() => {setItemsPerPage('15')}}>15</button>
                        </div>
                    </div>

                    <div className='table_sort_select'>
                        <label>Status sort {sort.status && `: ${sort.status}`}</label>
                        <div className='table_sort_buttons'>
                            {sort.status !='completed' 
                                ? 
                                <button onClick={()=>{setSort( {status:'completed'} )}}>Completed</button> 
                                :
                                <button className='selected' onClick={()=>{setSort({})}}>Completed</button> 
                            }

                            {sort.status !='notCompleted' 
                                ?
                                <button onClick={()=>{setSort( {status:'notCompleted'} )}}>NoCompleted</button>
                                :
                                <button className='selected' onClick={()=>{setSort({})}}>NoCompleted</button> 
                            }

                        </div>
                        
                    </div>
                </li>
                <li className={`table_context ${loadingTheme}`}>
                    <AdminOrderList
                        orders={orders}
                        onComfirmOrder={onComfirmOrder}
                    />
                </li>
            </ul> 
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