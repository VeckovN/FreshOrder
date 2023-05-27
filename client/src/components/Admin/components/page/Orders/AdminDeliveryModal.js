import {useState, useRef, useContext} from 'react'

import axios from 'axios';

import Modal from '../../../../UI/Modal/Modal.js'
import notificationContext from '../../../../Store/notification-context.js';

import './AdmiDelivery.css'

const AdminDeliveryModal = ({deliveryObj, onClose}) =>{

    const deliveryTimeRef = useRef('');
    const {addSuccess, addError} = useContext(notificationContext);

    const onClickComfirm = async() =>{
        const deliveryTime = deliveryTimeRef.current.value;
        const userEmail = deliveryObj.userEmail;
        // console.log("DELIVERY INFO : \n" + JSON.stringify(deliveryObj) )        
        //in Body
        // const {userEmail, deliveryTime} = req.body
        const deliveryBodyObject = {
            userEmail,
            deliveryTime
        }

        try{
            await axios.put(`http://localhost:8800/api/orders/complete/${deliveryObj.orderID}`, deliveryBodyObject);
            addSuccess(`You comfirm order`);

            const timer = setTimeout( ()=>{
                window.location.reload(false)
            }, 500)

            return() =>{
                clearTimeout(timer);
            }
        
            // //refesh page after order comfirmation
            // // onClose();
            // //addSuccess(`You comfirm order: ${userEmail}  with delivery time:  ${deliveryTime} minutes`);
            // addSuccess(`You comfirm order`);
        }
        catch(err){
            console.log("ERROR: " + err);
            addError("You can't set delivery time")
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