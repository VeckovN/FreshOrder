import {useState, useEffect, useContext} from 'react';
import { axiosJWT } from '../../../services/axiosJWTInstance.js';
import {convertDate, configureHeader} from '../../../utils/Helper.js'
import {Link} from 'react-router-dom';
import Pagination from '../../../utils/Pagination/Pagination';
import AuthContext from '../../../store/auth-context';
import './Users.css'

const Users = (props) =>{

    const {user} = useContext(AuthContext);
    const headers = configureHeader(user.accessToken)
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);

    const [totalData, setTotalData] = useState('');
    // //there is button wiht left and right arrow -> to move on next or back page
    const [currentPage, setCurrentPage] = useState('1');
    //we can't choose one of three options (5, 10, 15 ) items per page
    const [itemsPerPage, setItemsPerPage] = useState('10');

    const [updatedData, setUpdatedData] = useState({
        username:'',
        email:'',
        address:'',
        phone_number:''
    })

    const {username} = updatedData;

    useEffect(()=>{
        //getData();
        getDataPerPage();
        getTotalData();
    },[])

    //On Initial (pageNumber by default is 1, and limit is 5)
    const getData = async ()=>{
        try{
            const res = await axiosJWT.get('http://localhost:8800/api/users', {headers})
            const users = res.data;
            setData(users);
        }
        catch(err){
            console.log(err);
        }
    }

    //initial (onMountCompoennt) pageNumber is ofc 1 this will be called in Pagination 
    const getDataPerPage = async(pageNumber) =>{
        try{
            const res = await axiosJWT.get(`http://localhost:8800/api/users?page=${pageNumber}&limit=${itemsPerPage}`,{headers})
            const users = res.data;
            setData(users);
            setCurrentPage(pageNumber);
        }
        catch(err){
            console.log(err);
        }
    }

    const getTotalData = async() =>{
        const response = await axiosJWT.get('http://localhost:8800/api/users/count', {headers});
        const result = response.data;
        // setTotalData(result);
        console.log("COUNT : " + result.count);
        setTotalData(result.count);
    }

    const onEditHandler = () =>{
        setEdit(true);
        //call that for triggering USerModal Show State
        props.onEditUserUpdateHandler();
        //show modal with update User info
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
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.address}a</td>
                            <td>{item.phone_number}</td>
                            <td>
                                <div>{convertDate(item.createdAt).day}</div>
                                <div>{convertDate(item.createdAt).hour}</div>
                            </td>
                            <td >
                                <Link className='users_edit_link' to='update' state={item}>Edit</Link>
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
                />

            </div>
        </main>
    )
}

export default Users;