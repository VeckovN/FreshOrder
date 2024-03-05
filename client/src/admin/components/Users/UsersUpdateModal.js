import {useState, useContext, useEffect} from 'react';
import { axiosJWT } from '../../../services/axiosJWTInstance';
import useForm from '../../../hooks/useForm';
import authContext from '../../../store/auth-context';
import modalContext from '../../../store/modal-context';
import notificationContext from '../../../store/notification-context';
import { configureHeader } from '../../../utils/Helper';
import Modal from '../../../components/UI/Modal/Modal';

import ProfileInput from '../../../components/UI/ProfileInput';
import './UsersUpdateModal.css';


const UsersUpdateModal = () =>{
    const {addSuccess, addError} = useContext(notificationContext);
    const {user} = useContext(authContext);
    const {closeModal, userInfo} = useContext(modalContext);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [showDeleteCommit, setShowDeleteCommit] = useState(false);

    const initialInputObject = {
        username:"", 
        email:"", 
        address:"", 
        phone_number:"" 
    }
    // const {values, errors, handleChanges, resetAllValues} = useForm(initialInputObject);

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
                const headers = configureHeader(user.accessToken)
                const result = await axiosJWT.put(`http://localhost:8800/api/users/updateuser/${userInfo._id}`, updateObject, {headers})
                const responseData = result.data;
                setData(responseData)
                addSuccess("User successfully updated");
                updateObject = {};
                // resetAllValues(); //Values state reseted
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

    const {values, errors, shows, handleChanges, handleShowClickHandler, handleUserEditSubmit} = useForm(initialInputObject, onUserUpdate);

    //we wanna reRender(show new State) after user update (fetch again new data)
    useEffect(()=>{
        setData(userInfo);
        setLoading(true);
    },[]);

    const deleteUserHandler = async() =>{
        try{
            const headers = configureHeader(user.accessToken)
            const res = await axiosJWT.delete(`http://localhost:8800/api/users/${data._id}`, {headers});
            const resMessage = res.data;
            addSuccess(resMessage);
            closeModal();
            //show new list of users
        }
        catch(err){
            console.log("Delete Error: " + err);
            addError("You can't delete user right now")
        }
    }

    const checkForCommit = ()=>{
        if(shows.username && values.username!=undefined && values.username!='' || shows.email && values.email!=undefined && values.email!='' || shows.phone_number && values.phone_number!=undefined && values.phone_number!='' || shows.address && values.address!=undefined && values.address!='' || shows.password && values.password!=undefined && errors)
            return true;
        else
            return false;
    }


    const usersHeaderContext =
            'FreshOrder';

    const usersBodyContext =
    <>
    {loading ?
        <div className='users-input-container'>
            <div className='users-inputs'>
                <div className='input-field users-input-field'>
                    <ProfileInput
                        name='username'
                        type='text'
                        placeholder='Enter new username'
                        userInfo={data}
                        errors={errors}
                        shows={shows}
                        onClickShowHandler={() => handleShowClickHandler("username")}
                        handleChanges={handleChanges}
                    />
                </div>

                <div className='input-field users-input-field'>
                    <ProfileInput
                        name='email'
                        type='text'
                        placeholder='Enter new email'
                        userInfo={data}
                        errors={errors}
                        shows={shows}
                        onClickShowHandler={() => handleShowClickHandler("email")}
                        handleChanges={handleChanges}
                    />
                </div>

                <div className='input-field users-input-field'>
                    <ProfileInput
                        name='address'
                        type='text'
                        placeholder='Enter new address'
                        userInfo={data}
                        errors={errors}
                        shows={shows}
                        onClickShowHandler={() => handleShowClickHandler("address")}
                        handleChanges={handleChanges}
                    />
                </div>

                <div className='input-field users-input-field'>
                    <ProfileInput
                        name='phone_number'
                        type='text'
                        placeholder='Enter new phone number'
                        userInfo={data}
                        errors={errors}
                        shows={shows}
                        onClickShowHandler={() => handleShowClickHandler("phone_number")}
                        handleChanges={handleChanges}
                    />   
                </div>
                <div className='users-commit-container'>
                    <button onClick={handleUserEditSubmit}  disabled={!checkForCommit()}>Commit</button>
                </div>

                <div className='users-delete-container'>

                    {showDeleteCommit ?
                    <div className='user-delete-commit-part'>
                        <div id="delete-text">Do you really want to delete the User?</div>
                        <div className='user-delete-buttons'>
                            <button onClick={deleteUserHandler}>Yes</button>
                            <button onClick={() => setShowDeleteCommit(false)}>No</button>
                        </div>
                    </div>
                    
                    :             
                    <button onClick={() => setShowDeleteCommit(true)} className='deleteButton'>Delete User</button>
                    }
                    </div>
            </div>
        </div>
        :    
        <div>LOADING</div>
        }
    </>
    
    return (
        <Modal 
            ModalContainerStyle='AdminUpdateModal'
            HeaderContext = {usersHeaderContext}
            BodyContext = {usersBodyContext}
            onCloseModal={closeModal}  //from App.js for closing modal
            >
        </Modal>
    )
}

export default UsersUpdateModal;