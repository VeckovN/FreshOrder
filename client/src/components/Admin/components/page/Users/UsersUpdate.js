import {useState, useContext, useRef, useEffect} from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import axios from 'axios';

import notificationContext from '../../../../Store/notification-context';

const UsersUpdate = () =>{

    //Take passed state through Link component (<Link state={}>)

    const navigate = useNavigate();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const userInfo = location.state;
    //we wanna reRender(show new State) after user update (fetch again new data)
    useEffect(()=>{
        console.log("HHHHHH");
        setData(userInfo);
        setLoading(true);
    },[]);


    // setUserInfo(location.state);

    const {addSuccess, addError} = useContext(notificationContext);

    // const [updatedData, setUpdatedData] = useState({
    //     username:'',
    //     email:'',
    //     address:'',
    //     phone_number:''
    // })
    // const {username, email, address, phone_number} = updatedData;

    // console.log("STATE: \n" + JSON.stringify(updatedData));

    // const onChangeUpdateData = (event)=>{
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setUpdatedData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }
    const usernameRef = useRef('');
    const emailRef = useRef('');
    const addressRef = useRef('');
    const phone_numberRef = useRef('');

    const commitHandler = async() =>{

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;
        const phone_number = phone_numberRef.current.value;

        let updateObject = {};
        if(username !='')
            updateObject.username = username;
        if(email !='')
            updateObject.email = email;
        if(address !='')
            updateObject.address = address;
        if(phone_number !='')
            updateObject.phone_number =phone_number;
      

        console.log("Updated Object: " + JSON.stringify(updateObject));

        try{
            const result = await axios.put(`http://localhost:8800/api/users/updateuser/${userInfo._id}`, updateObject)
            const responseData = result.data;
            setData(responseData)
            addSuccess("Sucess Updated");

            usernameRef.current.value='';
            emailRef.current.value='';
            addressRef.current.value='';
            phone_numberRef.current.value='';
        }
        catch(err){
            console.log("Error: " + err);
            addError("You can't update right now")
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
                            ref={usernameRef}
                            // value={username}
                            // onChange={onChangeUpdateData}
                        />
                    </div>

                    <div className='input_field users_input_field'>
                    {/* <div>Email:<span> {userInfo.email}</span> </div> */}
                    <div>Email:<span>{data.email}</span> </div>
                        <input
                            className='input_field'
                            type='text'
                            name='email'
                            placeholder='Enter new email'
                            ref={emailRef}
                            // value={email}
                            // onChange={onChangeUpdateData}
                        />
                    </div>

                    <div className='input_field users_input_field'>
                    {/* <div>Address:<span>{userInfo.address}</span> </div> */}
                    <div>Address:<span>{data.address}</span> </div>
                        <input
                            className='input_field'
                            type='text'
                            name='address'
                            placeholder='Enter new Address'
                            ref={addressRef}
                            // value={address}
                            // onChange={onChangeUpdateData}
                        />
                    </div>

                    <div className='input_field users_input_field'>
                    {/* <div>Phone number:<span>{userInfo.phone_number}</span> </div> */}
                    <div>Phone number:<span>{data.phone_number}</span> </div>                           
                        <input
                            className='input_field'
                            type='number'
                            name='phone_number'
                            placeholder='Enter new phone number'
                            ref={phone_numberRef}
                            // value={phone_number}
                            // onChange={onChangeUpdateData}
                        />
                    </div>


                    <div className='users_commit_container'>
                        {/* <button onClick={commitHandler} disabled={!checkForCommit()} className='commitButton'>Commit</button> */}
                        <button onClick={commitHandler} className='commitButton'>Commit</button>
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