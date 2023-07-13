import {useState, useContext, useRef, useEffect} from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import useForm from '../../../../../utils/Hooks/useForm';
import axios from 'axios';


import notificationContext from '../../../../Store/notification-context';

const UsersUpdate = () =>{
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const userInfo = location.state;

    const initialInputObject = {
        username:"", 
        email:"", 
        address:"", 
        phone_number:"" 
    }

    

    const {values, errors, handleChanges, resetAllValues} = useForm(initialInputObject);

    const onUserUpdate = async() =>{
        let updateObject = {};
        if(values.username !='')
            updateObject.username = values.username;
        if(values.email !='')
            updateObject.email = values.email;
        if(values.address !='')
            updateObject.address = values.address;
        if(values.phone_number !='')
            updateObject.phone_number = values.phone_number;

        console.log("Updated Object: " + JSON.stringify(updateObject));

        if(Object.keys(updateObject).length != 0){
            try{
                const result = await axios.put(`http://localhost:8800/api/users/updateuser/${userInfo._id}`, updateObject)
                const responseData = result.data;
                setData(responseData)
                addSuccess("User successfully updated");
                updateObject = {};
                resetAllValues(); //Values state reseted


            }
            catch(err){
                console.log("Error: " + err);
                if(err.response.data)
                    addError(err.response.data.message);
                else
                    addError("You can't update right now")

            }
        }
        else
            addError("Not eneterd values");
        
    }

    //we wanna reRender(show new State) after user update (fetch again new data)
    useEffect(()=>{
        console.log("HHHHHH");
        setData(userInfo);
        setLoading(true);
    },[]);

    const {addSuccess, addError} = useContext(notificationContext);


    const deleteUserHandler = async() =>{
        try{
            const res = await axios.delete(`http://localhost:8800/api/users/${data._id}`);
            const resMessage = res.data;
            addSuccess(resMessage);
            navigate('/users');
        }
        catch(err){
            console.log("Delete Error: " + err);
            addError("You can't delete user right now")
        }
    }

    return(

        <div className="usersUpdate_container">
            <div className='users_input_container'>
                {loading ?
                <div className='users_inputs'>
                    <div className='input_field users_input_field'>
                        {/* <div>Username: <span>{userInfo.username}</span></div> */}
                        <div>Username: <span>{data.username}</span></div>
                        {/* <div>{user._id}</div> */}
                        <input
                            className='input_field'
                            type='text'
                            name='username'
                            placeholder='Enter new username'
                            onChange={handleChanges}
                            value={values.username}
                        />
                        {errors.username && <label className='errorInputLabel'>{errors.username}</label>}
                    </div>

                    <div className='input_field users_input_field'>
                    {/* <div>Email:<span> {userInfo.email}</span> </div> */}
                    <div>Email:<span>{data.email}</span> </div>
                        <input
                            className='input_field'
                            type='text'
                            name='email'
                            placeholder='Enter new email'
                            onChange={handleChanges}
                            value={values.email}
                            
                        />
                        {errors.email && <label className='errorInputLabel'>{errors.email}</label>}
                    </div>

                    <div className='input_field users_input_field'>
                    {/* <div>Address:<span>{userInfo.address}</span> </div> */}
                    <div>Address:<span>{data.address}</span> </div>
                        <input
                            className='input_field'
                            type='text'
                            name='address'
                            placeholder='Enter new Address'
                            onChange={handleChanges}
                            value={values.address}
                        />
                        {errors.address && <label className='errorInputLabel'>{errors.address}</label>}
                    </div>

                    <div className='input_field users_input_field'>
                    {/* <div>Phone number:<span>{userInfo.phone_number}</span> </div> */}
                    <div>Phone number:<span>{data.phone_number}</span> </div>                           
                        <input
                            className='input_field'
                            type='number'
                            name='phone_number'
                            placeholder='Enter new phone number'
                            onChange={handleChanges}
                            value={values.phone_number}
                        />
                        {errors.phone_number && <label className='errorInputLabel'>{errors.phone_number}</label>}
                    </div>


                    <div className='users_commit_container'>
                        {/* <button onClick={commitHandler} disabled={!checkForCommit()} className='commitButton'>Commit</button> */}
                        <button onClick={onUserUpdate} className='commitButton'>Commit</button>
    
                    </div>
                    <div className='users_delete_container'>
                        <button onClick={deleteUserHandler} className='deleteButton'>Delete User</button>
                    </div>
                </div>
                :    
                <div>LOADING</div>
                }
            </div>
        </div>
    )
}

export default UsersUpdate;