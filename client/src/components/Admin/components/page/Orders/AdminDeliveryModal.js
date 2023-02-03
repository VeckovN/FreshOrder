import {useState, useRef, useContext} from 'react'
import axios from 'axios';

import Modal from '../../../../UI/Modal.js'
import notificationContext from '../../../../Store/notification-context.js';

const AdminDeliveryModal = ({deliveryObj, onClose}) =>{

    const deliveryTimeRef = useRef('');
    const {addSuccess, addError} = useContext(notificationContext);

    const onClickComfirm = async() =>{
        const deliveryTime = deliveryTimeRef.current.value;
        const userEmail = deliveryObj.userEmail;

        //in url
        //orderID 
        
        //in Body
        // const {userEmail, deliveryTime} = req.body

        alert("DTIME: " + deliveryTime + "for OrderID: " + deliveryObj.orderID + "UserID :" + deliveryObj.userEmail);
    
        const deliveryBodyObject = {
            userEmail,
            deliveryTime
        }

        alert("BODY: " + JSON.stringify(deliveryBodyObject));

        try{
            const result = await axios.put(`http://localhost:8800/api/orders/complete/${deliveryObj.orderID}`, deliveryBodyObject);
            const resultResponse = result.data;
            console.log("RES: " + resultResponse);
            addSuccess(`You comfirm order: ${userEmail}  with delivery time:  ${deliveryTime} minutes`);
        }
        catch(err){
            console.log("ERROR: " + err);
            addError("You can't set delivery time")
        }
    }

    // const deliveryHeader

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
            HeaderContext = {deliveryHeaderContext}
            BodyContext = {deliveryBodyContext}
            FooterContext = {deliveryFooterContext}
            onCloseModal={onClose}
        />
            

    )
}

export default AdminDeliveryModal;