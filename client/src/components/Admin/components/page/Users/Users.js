import {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


import './Users.css'

const Users = (props) =>{

    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);

    const [updatedData, setUpdatedData] = useState({
        username:'',
        email:'',
        address:'',
        phone_number:''
    })

    const {username} = updatedData;

    
    useEffect(()=>{
       getData();
    },[])

    const getData = async ()=>{
        try{
            const res = await axios.get('http://localhost:8800/api/users')
            const users = res.data;
            setData(users);
        }
        catch(err){
            console.log(err);
        }
    }

    const convertDate=(date) =>{
        //2022-11-01T09:25:53.161Z
        //Date 2022-11-01 BEFORE T
        //time  09:25 (Only 5word AFTER T) 
        const T_sign = date.indexOf('T');

        //2022-11-01 replaceAll 2022/11/01 
        //final show revers 01/11/2022
        let stringDate = date.slice(0,T_sign).replaceAll('-','/');
        let stringTime = date.substring(T_sign, 5).replace('-', ':');
        console.log();

        // return stringDate.concate(' ' , stringTime);
        return stringDate.concat(" - ", stringTime);
    }

    // const onChangeUpdateData = (event)=>{

    //     const name = event.target.name;
    //     const value = event.target.value;

    //     setUpdatedData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

    // const commitHandler = () =>{

    // }
    


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
                            <th>PhoneNumber</th>
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
                            <td>{convertDate(item.createdAt)}</td>
                            <td>
                            {/* <button onClick={onEditHandler}>Edit</button> */}
                            {/* <Link className='' to='/usersUpdate' state={item}>Edit</Link> */}
                            
                            {/* wiht /update will lead to /update not on nasted route /users/update */}
                            <Link className='' to='update' state={item}>Edit</Link>
                               
                            </td>
                            
                        </tr>
                    ))
                    }
                        
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Users;