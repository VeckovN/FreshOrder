import {useState, useEffect, useContext} from 'react';
import { axiosJWT } from '../../../services/axiosJWTInstance.js';
import {convertDate, configureHeader} from '../../../utils/Helper.js'
import Pagination from '../../../utils/Pagination/Pagination';
import authContext from '../../../store/auth-context';
import modalContext from '../../../store/modal-context.js';
import './Users.css'

const Users = () =>{

    const {user} = useContext(authContext);
    const {showAdminUpdate} = useContext(modalContext);
    const headers = configureHeader(user.accessToken)
    const [data, setData] = useState([]);

    const [totalData, setTotalData] = useState('');
    // //there is button wiht left and right arrow -> to move on next or back page
    const [currentPage, setCurrentPage] = useState('1');
    //we can't choose one of three options (5, 10, 15 ) items per page
    const [itemsPerPage, setItemsPerPage] = useState('10');

    useEffect(()=>{
        getDataPerPage();
        getTotalData();
    },[])

    //initial (onMountCompoennt) pageNumber is ofc 1 this will be called in Pagination 
    const getDataPerPage = async(pageNumber) =>{
        try{
            const res = await axiosJWT.get(`http://localhost:8800/api/users?page=${pageNumber}&limit=${itemsPerPage}`,{headers})
            const users = res.data;
            setData(users);
            setCurrentPage(pageNumber);
        }
        catch(err){
            console.error(err);
        }
    }

    const getTotalData = async() =>{
        const response = await axiosJWT.get('http://localhost:8800/api/users/count', {headers});
        const result = response.data;
        setTotalData(result.count);
    }

    return(
        <main className='mainAdmin'>
            <div className="users_container">
                <h1> All Users </h1>
                <table className ="users_table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>CreatedAt</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map(item =>(
                        <tr key={item._id}>
                            <td data-cell="Username:">{item.username}</td>
                            <td data-cell="Email:">{item.email}</td>
                            <td data-cell="Address:">{item.address}a</td>
                            <td data-cell="PhoneNumber:">{item.phone_number}</td>
                            <td data-cell="CreatedAt:">
                                <div>{convertDate(item.createdAt).day} {convertDate(item.createdAt).hour}</div>
                            </td>
                            <td className='edit_btn_td'>
                                <button className='users_edit_button' onClick={() => showAdminUpdate(item)}>Edit</button>
                            </td>
                        </tr>
                    ))
                    }
                        
                    </tbody>
                </table>

                <Pagination 
                    itemsPerPage={itemsPerPage} 
                    totalItems={totalData} 
                    onPageNumberSelect={getDataPerPage} 
                    currentPage={currentPage ? currentPage : '1'}
                />

            </div>
        </main>
    )
}

export default Users;