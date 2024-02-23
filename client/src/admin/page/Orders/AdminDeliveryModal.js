import {useRef, useContext} from 'react'
import { axiosJWT } from '../../../services/axiosJWTInstance.js';
import { configureHeader } from '../../../utils/Helper.js';
import Modal from '../../../components/UI/Modal/Modal.js'
import notificationContext from '../../../store/notification-context.js';
import authContext from '../../../store/auth-context.js';

import './AdmiDelivery.css'

const AdminDeliveryModal = ({deliveryObj, onClose}) =>{

    const deliveryTimeRef = useRef('');
    const {addSuccess, addError} = useContext(notificationContext);
    const {user} = useContext(authContext);

    const onClickComfirm = async() =>{
        const deliveryTime = deliveryTimeRef.current.value;
        const userEmail = deliveryObj.userEmail;

        if(deliveryTime){
            if(deliveryTime <= 300) //max 300 mins
            {  
                const deliveryBodyObject = {
                    userEmail,
                    deliveryTime
                }
                try{
                    const headers = configureHeader(user.accessToken)
                    await axiosJWT.put(`http://localhost:8800/api/orders/complete/${deliveryObj.orderID}`, deliveryBodyObject, {headers});
                    addSuccess(`You comfirm order`);

                    const timer = setTimeout( ()=>{
                        window.location.reload(false)
                    }, 500)

                    return() =>{
                        clearTimeout(timer);
                    }
                }
                catch(err){
                    console.log("ERROR: " + err);
                    addError("You can't set delivery time")
                }
            }
            else
                addError("Maximum 300min for delivery")
        }
        else{
            addError("Delivery time not set");
        }
    }

    const deliveryHeaderContext =
            'FreshOrder';

    const deliveryBodyContext =
            <div className='delivery_container'>
                <h3 >Order delivery time </h3>
                <div className='delivery_input_fields'>
                    <input 
                        type='number'
                        placeholder='Enter delivert time in minutes'
                        ref={deliveryTimeRef}
                    />
                    <button className='' onClick={onClickComfirm}>Comfirm</button>
                </div>
            </div>
        
    const deliveryFooterContext = 
            <> 
            </>

    return (
        <Modal
            ModalContainerStyle='DeliveryModal'
            HeaderContext = {deliveryHeaderContext}
            BodyContext = {deliveryBodyContext}
            FooterContext = {deliveryFooterContext}
            onCloseModal={onClose}
        />
    )
}

export default AdminDeliveryModal;