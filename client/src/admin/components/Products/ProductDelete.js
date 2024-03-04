import { useState, useContext} from 'react';
import notificationContext from '../../../store/notification-context';
import { axiosJWT } from '../../../services/axiosJWTInstance.js';
import modalContext from '../../../store/modal-context.js';
import Modal from '../../../components/UI/Modal/Modal.js';

import './ProductDelete.css';
const ProductDelete = () =>{

    const {addSuccess, addError} = useContext(notificationContext);
    const {closeModal, productDeleteInfo} = useContext(modalContext);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const productID = productDeleteInfo.productID;
    const headers = productDeleteInfo.headers;


    const onSoftDeleteProduct = async() =>{
        try{
            const result = await axiosJWT.put(`http://localhost:8800/api/products/softDelete/${productID}`, {headers})
            const resultData = result.data;
            addSuccess(resultData);
            //this will re-render compoennt( parrent function that reFetch selected category products)
            // isChanged(true);
            closeModal();
        }
        catch(err){
            console.log('ERR: ' + err);
            addError("You can't solf delete the product");
        }
    }

    const onDeleteProduct = async() =>{
        try{
            const result = await axiosJWT.delete(`http://localhost:8800/api/products/${productID}`, {headers})
            const resultData = result.data;
            addSuccess(resultData);
            // isChanged();
            closeModal();
        }
        catch(err){
            console.log("Delete Product Error: " + err);
            addError("You can't delete the product right now");
        }
    }

    const ProductDeleteHeaderContext =
            'Product Delete';

    const ProductDeleteBodyContext =
        <div className='product-del-container'>
            <div className='product-del-title'>You have two options for deleting Product</div>

            <div className='product-del-option'>
                <label>The Product Won't be displayed on the Client Home</label>
                <button className='product-del-option-btn' onClick={onSoftDeleteProduct}>Soft Delete</button>
            </div>

            <div className='product-del-option'>
                <label>The Product will be permanently deleted</label>
                <button className={`product-del-option-btn ${confirmDelete ? 'active-del-btn' : ''} `} onClick={()=>setConfirmDelete((prev)=>!prev)}>Permanent Delete</button>
            </div>

            {confirmDelete &&
            <div className='product-confirm-del-container'>
                <label> Are you really want to delete Product?</label>
                <div className='product-confirm-del-buttons'> 
                    <button onClick={onDeleteProduct}> Yes </button>
                    <button onClick={()=>setConfirmDelete(false)}> No </button>
                </div>
            </div>
            }
        </div>
        
    return (
        <Modal
            ModalContainerStyle='productDelete'
            HeaderContext = {ProductDeleteHeaderContext}
            BodyContext = {ProductDeleteBodyContext}
            onCloseModal= {closeModal}
        />
    )
}

export default ProductDelete;

