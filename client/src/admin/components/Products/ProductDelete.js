import { useState, useContext} from 'react';
import notificationContext from '../../../store/notification-context';
import { axiosJWT } from '../../../services/axiosJWTInstance.js';

import './ProductDelete.css';
const ProductDelete = ({productID, isChanged, headers}) =>{

    const {addSuccess, addError} = useContext(notificationContext);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const onSoftDeleteProduct = async() =>{
        try{
            const result = await axiosJWT.put(`http://localhost:8800/api/products/softDelete/${productID}`, {headers})
            const resultData = result.data;
            addSuccess(resultData);
            //this will re-render compoennt( parrent function that reFetch selected category products)
            isChanged(true);
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
            isChanged();
        }
        catch(err){
            console.log("Delete Product Error: " + err);
            addError("You can't delete the product right now");
        }
    }

    return (
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
    )


    // const ProductDeleteHeaderContext =
    //         'Product Delete';

    // const ProductDeleteBodyContext =
    //     <div className='product-del-container'>
    //         <div className='product-del-title'>You have two options for deleting Product</div>

    //         <div className='product-del-option'>
    //             <div className='product-del-option-title'>The Product Won't be displayed on the Client Home</div>
    //             <button className='product-del-option-btn'>Soft Delete</button>
    //         </div>

    //         <div className='product-del-option'>
    //             <div className='product-del-option-title'>The Product will be permanently deleted</div>
    //             <button className='product-del-option-btn'>Permanent Delete</button>
    //         </div>
    //     </div>
        
    // return (
    //     <Modal
    //         ModalContainerStyle='productDelete'
    //         HeaderContext = {ProductDeleteHeaderContext}
    //         BodyContext = {ProductDeleteBodyContext}
    //         onCloseModal={onClose}
    //     />
    // )
}

export default ProductDelete;

