import {useState} from 'react';
import Modal from '../../../components/UI/Modal/Modal.js';

const UsersModal = (props) =>{

    const [updatedData, setUpdatedData] = useState({
        username:'',
        email:'',
        address:'',
        phone_number:''
    })
    const {username, email, address, phone_number} = updatedData;

    const onChangeUpdateData = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setUpdatedData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const commitHandler = () =>{
        //save Users new values
        alert("You successfully updated");
    }

    //MODAL FOR UPDATING
    const usersHeaderContext =
            'FreshOrder';

    const usersBodyContext =
        <div className='users_input_container'>
            <div className='users_input_field'>
                <div>Username: </div>
                <input
                    className='input_field'
                    type='text'
                    name='username'
                    value={username}
                    placeholder='Enter new username'
                    onChange={onChangeUpdateData}
                />
            </div>

            <div className='users_input_field'>
            <div>Email: </div>
                <input
                    className='input_field'
                    type='text'
                    name='email'
                    value={email}
                    placeholder='Enter new email'
                    onChange={onChangeUpdateData}
                />
            </div>

            <div className='users_input_field'>
            <div>Address: </div>
                <input
                    className='input_field'
                    type='text'
                    name='address'
                    value={address}
                    placeholder='Enter new Address'
                    onChange={onChangeUpdateData}
                />
            </div>

            <div className='users_input_field'>
            <div>Phone number: </div>
                <input
                    className='input_field'
                    type='number'
                    name='phone_number'
                    value={phone_number}
                    placeholder='Enter new phone number'
                    onChange={onChangeUpdateData}
                />
            </div>

            <div className='users_commit_container'>
                {/* <button onClick={commitHandler} disabled={!checkForCommit()} className='commitButton'>Commit</button> */}
                <button onClick={commitHandler} className='commitButton'>Commit</button>
            </div>
        </div>
    
    const usersFooterContext = 
            <>
                
            </>

    return (
        <Modal 
            HeaderContext = {usersHeaderContext}
            BodyContext = {usersBodyContext}
            FooterContext = {usersFooterContext}
            onCloseModal={props.onClose}  //from App.js for closing modal
            >
        </Modal>
    )

}

export default UsersModal;