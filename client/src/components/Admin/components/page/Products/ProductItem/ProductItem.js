import {useState, useEffect, useContext} from 'react'
import useForm from '../../../../../../utils/Hooks/useForm';
import axios from 'axios';
import notificationContext from '../../../../../Store/notification-context';

//isChanged is handler which trach changing on this compoenent and
//notify parent(Product) to reFetch new updated items
const ProductItem = ({item, isChanged, onEditProduct}) =>{
    const productItemID = item._id;
    //state used for notify parrent(Product.js) component to reFetch showed items
    //to get new refresh(updated) items
    // const [isChanged, setIsChanged] = useState();

    const {addSuccess, addError} = useContext(notificationContext);
    const [showEdit, setShowEdit] = useState(false);
    const initialInputObject = {
        product_name:'',
        product_price:'',
        product_description:'',
    }

    //trigger show state on Product
    const onEdit = ()=>{
        setShowEdit(true)
    }
    const onEditCancel = ()=>{
        setShowEdit(false)
    }


    //Instead of others form then all inputs must be filled here ins't that scenario
    //u could only filled (update) any input not all of them
    const onEditAccept = async()=>{
        console.log("FFFFF: " + JSON.stringify(values))
        console.log("EEEEEEEEE: " + JSON.stringify(errors))

        //filter work only on list and this function Object.entries transform object in array as ['key', 'value']
        //{product_name:'margarita" ,product_price:'13.99'} -> [ ['product_name' , 'margarita'],  ['product_price' , ' 13.99']]
        let newContext = Object.entries(values).filter(([key,value]) => value !='').reduce((obj, [key,value]) =>{
            //example there is name="margarita", price = '3.99' , but description='' won't be added

            //format it becase BE expects {name, price, description } instead product_ as prefix
            if(key == 'product_name')
                key = 'name';
            else if(key == 'product_price')
                key  = 'price'
            else if (key == 'product_description')
                key = 'desription'

            obj[key] = value; 
            return obj
        }, {}); //{} as acc ->object 

        const response = await axios.put(`http://localhost:8800/api/products/${productItemID}`, newContext)
        const updaterdProduct = response.data;
        addSuccess("You successfully updated product")
        //and update on frontend
        resetAllValues();
        //trigger Parrent component re-render(reFetch) to show new Item value 
        isChanged();
    }

    const {values, errors, handleChanges, resetAllValues, RemoveValueFromObject, handleEditProductSubmit} = useForm(initialInputObject, onEditAccept);


    const onSoftDeleteProduct = async() =>{
        //change to true
        if(!item.isDeleted){
            //soft delete it
            try{
                const result = await axios.put(`http://localhost:8800/api/products/softDelete/${item._id}`)
                const resultData = result.data;
                addSuccess(resultData); //notify
                //this will re-render compoennt( parrent function that reFetch selected category products)
                isChanged(true);
            }
            catch(err){
                console.log('ERR: ' + err);
                addError("You can't solf delete the product");
            }
        }
        else{
            try{
                const result = await axios.put(`http://localhost:8800/api/products/softAdd/${item._id}`)
                const resultData = result.data;
                addSuccess(resultData);
                //Trigger reFetching on Product compoennt
                isChanged();
            }
            catch(err){
                console.log('ERR: ' + err);
                addError("You can't recover the product");
            }
        }
    }

    const onDeleteProduct = async() =>{
        alert("delete It");
        try{
            const result = await axios.delete(`http://localhost:8800/api/products/${item._id}`)
            const resultData = result.data;
            addSuccess(resultData);
            isChanged();
        }
        catch(err){
            console.log("Delete Product Error: " + err);
            addError("You can't delete the product right now");
        }
    }


    return(
        <tr className={item.isDeleted && 'isDeleted ' }>
            <td className='table_td_product'>
                {/* <div className="td_product_title">{!name ? item.name : name}</div> */}
                <div className="td_product_title">{item.name}</div>
                {showEdit && <input
                        type='text'
                        name='product_name'
                        onChange={handleChanges}
                        value={values.product_name}
                        className='td_product_input_name'
                        placeholder='Enter new name'
                    />}
                {errors.product_name && <p>{errors.product_name}</p>}
            </td>
            
            <td className='table_td_product'>
                <div className="td_product_title">{item.price}</div>
                {showEdit && <input
                        type='number'
                        name='product_price'
                        onChange={handleChanges}
                        value={values.product_price}
                        className='td_product_input_price'
                        placeholder='New price'
                    />}
                {errors.product_price && <p>{errors.product_price}</p>}
            </td>


            <td className='table_td_product'>
                <div className="td_product_title">{item.description}</div>
                {showEdit && <textarea 
                        rows="3" 
                        cols="30" 
                        className="td_product_textarea_description"  
                        name="product_description"
                        value={values.product_description}
                        onChange={handleChanges}
                    />}
                {errors.product_description && <p>{errors.product_description}</p>}
            </td>

            
            <td>{item.isDeleted ? 'Yes' : 'No'}</td>
            <td className='table_td_actions'>
                {!showEdit ?
                    <button className='editProduct_button' onClick={onEdit}>Edit</button>
                    :
                    <div className='showEditProduct_buttonContainer'>
                        <label>EDIT</label>
                        <button className='editCancelProduct_button' onClick={onEditCancel}>Cancel</button>
                        {/* <button className='editAcceptProduct_button' onClick={onEditAccept}>Accept</button> */}
                        <button className='editAcceptProduct_button' onClick={handleEditProductSubmit}>Accept</button>
                    </div>
                }
                <button className='softDeleteProduct_button' onClick={onSoftDeleteProduct}>Soft</button>
                <button className='deleteProduct_button' onClick={onDeleteProduct}>Del</button>
            </td>
        </tr>
    )

}

export default ProductItem;