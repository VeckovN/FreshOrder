import {useState, useEffect, useContext} from 'react'

import axios from 'axios';

import notificationContext from '../../../../Store/notification-context';


//isChanged is handler which trach changing on this compoenent and
//notify parent(Product) to reFetch new updated items
const ProductItem = ({item, isChanged, onEditProduct}) =>{

    const productItemID = item._id;

    //state used for notify parrent(Product.js) component to reFetch showed items
    //to get new refresh(updated) items
    // const [isChanged, setIsChanged] = useState();

    const {addSuccess, addError} = useContext(notificationContext);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [showEdit, setShowEdit] = useState(false);

    const onChangeNameInput = (e) =>   
        setName(e.target.value)

    const onChangePriceInput = (e) =>
        setPrice(e.target.value)

    const onChangeDescriptionInput = (e) =>{
        setDescription(e.target.value)
    }

    const onEdit = ()=>{
        //trigger show state on Product
        setShowEdit(true)
    }
    const onEditCancel = ()=>{
        setShowEdit(false)
    }
    const onEditAccept = async()=>{
        const newContext = {}
        if(name!='')
            newContext.name = name;
        if(price!='')
            newContext.price =price
        if(description !='')
            newContext.description = description;

        alert("CONTEXT: \n" + JSON.stringify(newContext))

        const response = await axios.put(`http://localhost:8800/api/products/${productItemID}`, newContext)
        const updaterdProduct = response.data;

        addSuccess("You successfully updated product")

        //and update on frontend
        setName('');
        setPrice('');
        setDescription('');

        //trigger Parrent component re-render(reFetch) to show new Item value 
        isChanged();

    }

    const onSoftDeleteProduct = async() =>{
        //change to true
        if(!item.isDeleted){
            //soft delete it
            try{
                const result = await axios.put(`http://localhost:8800/api/products/softDelete/${item._id}`)
                const resultData = result.data;

                // addSuccess("You solf deleted the : " + item.name)
                addSuccess(resultData);

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
                //change to false (return on no delete)
                const result = await axios.put(`http://localhost:8800/api/products/softAdd/${item._id}`)
                const resultData = result.data;

                //addSuccess("You return the : " + item.name)
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
        catch{
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
                        name='name'
                        onChange={onChangeNameInput}
                        value={name}
                        className='td_product_input_name'
                        placeholder='Enter new name'
                    />}
            </td>
            
            <td className='table_td_product'>
                <div className="td_product_title">{item.price}</div>
                {showEdit && <input
                        type='number'
                        name='price'
                        onChange={onChangePriceInput}
                        value={price}
                        className='td_product_input_price'
                        placeholder='New price'
                    />}
            </td>


            <td className='table_td_product'>
                <div className="td_product_title">{item.description}</div>
                {showEdit && <textarea 
                        rows="3" 
                        cols="30" 
                        className="td_product_textarea_description"  
                        name="description"
                        value={description}
                        onChange={onChangeDescriptionInput}
                    />}
            </td>

            
            <td>{item.isDeleted ? 'Yes' : 'No'}</td>
            <td className='table_td_actions'>
                {!showEdit ?
                    <button className='editProduct_button' onClick={onEdit}>Edit</button>
                    :
                    <div className='showEditProduct_buttonContainer'>
                        <label>EDIT</label>
                        <button className='editCancelProduct_button' onClick={onEditCancel}>Cancel</button>
                        <button className='editAcceptProduct_button' onClick={onEditAccept}>Accept</button>
                    </div>
                }
                <button className='softDeleteProduct_button' onClick={onSoftDeleteProduct}>Soft</button>
                <button className='deleteProduct_button' onClick={onDeleteProduct}>Del</button>
            </td>
        </tr>
    )

}

export default ProductItem;