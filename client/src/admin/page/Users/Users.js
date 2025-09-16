import {useState, useEffect, useRef, useContext} from 'react';
import { axiosJWT } from '../../../services/axiosJWTInstance.js';
import {convertDate, configureHeader} from '../../../utils/Helper.js'
import Pagination from '../../../utils/Pagination/Pagination';
import authContext from '../../../store/auth-context';
import modalContext from '../../../store/modal-context.js';
import LoadingSpinner from '../../../utils/LoadingSpinner.js';
import './Users.css'

const Users = () =>{

    const {user} = useContext(authContext);
    const {showAdminUpdate} = useContext(modalContext);
    const headers = configureHeader(user.accessToken)
    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const firstRender = useRef(true);

    const [totalData, setTotalData] = useState('');
    const [currentPage, setCurrentPage] = useState('1');
    const [itemsPerPage, setItemsPerPage] = useState('10');

    useEffect(()=>{
        getDataPerPage();
        getTotalData();
    },[])

    //initial (onMountCompoennt) pageNumber is ofc 1 this will be called in Pagination 
    const getDataPerPage = async(pageNumber) =>{
        try{
            setIsLoading(true);
            const res = await axiosJWT.get(`/api/users?page=${pageNumber}&limit=${itemsPerPage}`,{headers})
            const users = res.data;
            setData(users);
            setCurrentPage(pageNumber);
            setIsLoading(false);

            if(!firstRender.current)
                window.scrollTo({ behavior: 'smooth', top: 0 });

            firstRender.current = false;
        }
        catch(err){
            console.error(err);
        }
    }

    const getTotalData = async() =>{
        const response = await axiosJWT.get('/api/users/count', {headers});
        const result = response.data;
        setTotalData(result.count);
    }

    return(
        <main className='mainAdmin'>
            <div className="users_container">
                <h1> All Users </h1>
                <table className ="users_table">
                {isloading && <LoadingSpinner/>}
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

                {totalData > 0 && !firstRender.current &&  (
                    <Pagination 
                        itemsPerPage={itemsPerPage} 
                        totalItems={totalData} 
                        onPageNumberSelect={getDataPerPage} 
                        currentPage={currentPage ? currentPage : '1'}
                    />
                )}

            </div>
        </main>
    )
}

export default Users;