import {useState, useContext} from 'react'
import useForm from '../../../hooks/useForm';
import { axiosJWT } from '../../../services/axiosJWTInstance';
import notificationContext from '../../../store/notification-context';
import modalContext from '../../../store/modal-context';

//isChanged is handler that tracks changes to this compoenent and
//notify parent(Product) to reFetch new updated items again
const ProductItem = ({item, isChanged, headers}) =>{
    const productItemID = item._id;
    const {addSuccess} = useContext(notificationContext);
    const {showAdminProductDelete} = useContext(modalContext);

    const [showEdit, setShowEdit] = useState(false);
    const initialInputObject = {
        product_name:'',
        product_price:'',
        product_description:'',
    }

    const onEdit = ()=> setShowEdit(true);
    const onEditCancel = ()=> setShowEdit(false);

    //u could fill(update) any input, not all of them.
    const onEditAccept = async()=>{
        //{product_name:'margarita" ,product_price:'13.99'} -> [ ['product_name' , 'margarita'],  ['product_price' , ' 13.99']]
        let newContext = Object.entries(values).filter(([key,value]) => value !='').reduce((obj, [key,value]) =>{
            //example there is name="margarita", price = '3.99' , but description='' won't be added
            //format it, because BE expects {name, price, description } instead product_ as prefix
            if(key == 'product_name')
                key = 'name';
            else if(key == 'product_price')
                key  = 'price'
            else if (key == 'product_description')
                key = 'description'

            obj[key] = value; 
            return obj
        }, {}); //{} as acc ->object 

        await axiosJWT.put(`http://localhost:8800/api/products/${productItemID}`, newContext, {headers})
        addSuccess("You successfully updated product")
        resetAllValues();
        isChanged();
    }

    const {values, errors, handleChanges, resetAllValues, RemoveValueFromObject, handleEditProductSubmit} = useForm(initialInputObject, onEditAccept);

    const showDeleteModal = () =>{
        const productObj = { 
            productID: productItemID,
            headers:headers,
            // function(reference) can also be passed as parameter of the useContext payload
            isChanged:isChanged 
        }
        showAdminProductDelete(productObj);  
    }
    return(
        <tr className={item.isDeleted && 'isDeleted ' }>
            <td className='table-td-product'>
                <div className="td-product-title">{item.name}</div>
                {showEdit && <input
                        className='td-product td-product-input-name'
                        type='text'
                        name='product_name'
                        onChange={handleChanges}
                        value={values.product_name}
                        placeholder='Enter new name'
                    />}
                {errors.product_name && <p className='product-error'>{errors.product_name}</p>}
            </td>
            
            <td className='table-td-product'>
                <div className="td-product-title">{item.price}</div>
                {showEdit && <input
                        className='td-product td-product-input-price'
                        type='number'
                        name='product_price'
                        placeholder='New price'
                        onChange={handleChanges}
                        value={values.product_price}
                    />}
                {errors.product_price && <p className='product-error'>{errors.product_price}</p>}
            </td>

            <td className='table-td-product'>
                <div className="td-product-title">{item.description}</div>
                {showEdit && <input
                        className="td-product td-product-desription"  
                        name="product_description"
                        placeholder='New Description'
                        value={values.product_description}
                        onChange={handleChanges}
                    />}
                {errors.product_description && <p className='product-error'>{errors.product_description}</p>}
            </td>

            <td>{item.isDeleted ? 'Yes' : 'No'}</td>
            <td className='table-td-actions'>
                {!showEdit ?
                    <button className='action-button ' onClick={onEdit}>Edit</button>
                    :
                    <div className='show-edit-product-buttons'>
                        <button className='action-button active-action-edit-button' onClick={onEditCancel}>Cancel</button>
                        <button className='action-button active-action-edit-button' onClick={handleEditProductSubmit}>Accept</button>
                    </div>
                }
                <button className={`action-button ${showEdit ? 'active-delete-button' : ''}`} onClick={showDeleteModal}>Delete</button>
            </td>
        </tr>
    )

}

export default ProductItem;