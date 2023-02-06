import {useState, useEffect} from 'react'
import Pagination from '../../../../../utils/Pagination/Pagination';
import LoadingSpinner from '../../../../../utils/LoadingSpinner';
import {convertDate} from '../../../../../utils/Helper.js'
import axios from 'axios';

import '../../../../Page/Orders/Orders.css'
import './AdminOrders.css'

const AdminOrders = (props)=>{

    const [isloading, setIsLoading] = useState(false);

    const [orders, setOrders] = useState([]);
    const [totalOrders,  setTotalOrders] = useState();
    const [itemsPerPage, setItemsPerPage] = useState('5');
    const [currentPage, setCurrentPage] = useState('1');

    const [sort, setSort] = useState({});


    useEffect(()=>{
        getDataPerPage();
        getTotalOrders();
    },[])


    //reFetch on change itemPerPage
    useEffect(()=>{
        getDataPerPage();
    },[itemsPerPage, sort])

    // const getOrders = async ()=>{
    //     // const res = await axios.get('');
    //     try{
    //         const res = await axios.get('http://localhost:8800/api/orders')
    //         const data = res.data;
    //         setOrders(data);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }  

    const getDataPerPage = async (pageNumber)=>{
        try{
            //on initial it's true
            setIsLoading(true)
            const res = await axios.get(`http://localhost:8800/api/orders?page=${pageNumber}&limit=${itemsPerPage}&sort=${sort.status}`)
            const data = res.data;
            //timer on IsLoading state
            setTimeout(()=>{
                setIsLoading(false);
                //affter loader is gone then show data
                setOrders(data);
                setCurrentPage(pageNumber);
            }, 500);
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
            userEmail:userEmail
        }
        //pass value to MODAL(which is called in APP.js)
        props.onEnterOrderDeliveryTime(deliveryInfo);
    }

    console.log("ORDERS INFO: " + JSON.stringify(orders));

    console.log("\n USERE:\n" + JSON.stringify(orders.user))

    // const ItemPerPageStyle = itemsPerPage ==

    const loadingTheme = isloading ? 'table_context_loading' : ''
    return(
        <div className="table_container">
            <h1> User Orders </h1>
                {/* {isloading ? 
                    <LoadingSpinner/>
                :
                <> */}
                
                {/* <ul className='table_order'> */}
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
                                {/* {sort!='completed' ? 
                                <button onClick={()=>{setSort('completed')}}>Completed</button> 
                                :
                                        <button onClick={()=>{setSort('notCompleted')}}>NoCompleted</button>
                                } */}
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
                                {/* return on default sort('createdAt') */}
                                {/* {sort && <button onClick={()=>{setSort()}}>Cancel</button> } */}
                            </div>
                            
                        </div>
                    </li>
                    <li className={`table_context ${loadingTheme}`}>
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
                                // return <li className='table-row' key={order._id}>
                                return <li className={completed}  key={order._id}>
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
                                            <div className ='colone col-6'>{order.isCompleted ? <p>Completed</p> : <p>Pending</p>}</div>
                                            <div className ='colone col-7'>{convertDate(order.createdAt)}</div>
                                    </li>
                            })}
                        </li>
                    </ul> 
                    {!isloading && <Pagination itemsPerPage={itemsPerPage} totalItems={totalOrders} onPageNumberSelect={getDataPerPage} currentPage={currentPage ? currentPage : '1'} />}
                {/* </> */}
            {/* } */}
                
        </div>
    )
    
}

export default AdminOrders;