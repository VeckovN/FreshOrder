import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import notificationContext from '../../../../../Store/notification-context';
import useForm from '../../../../../../utils/Hooks/useForm';


const AddProduct = () =>{

    const initialInputObject = {
        product_name:'',
        product_price:'',
        product_description:'',
        category:'',
        image:null,
    }
    const categoryOptions = ['Pizza', 'Pasta', 'Drinks', 'Desert', 'Salat']
    const {addSuccess, addError} = useContext(notificationContext);

    const onSubmitAddProduct = async(event) =>{

        try{
            //upload image(call api request for it) image uplaod and product create are seperated calls
            const formData = new FormData();
            // formData.append('image', image);
            formData.append('image', values.image);

            //generatedName as request --- res.status(200).json(file.filename);
            const result = await axios.post('http://localhost:8800/api/products/create', formData);
            const imageName = result.data;
            addSuccess("You successfuly uploaded " + result.data);

            console.log("UPLOAD RESULT :" + result.data);
            //useImgURL - image Name to create product 
            const otherData ={
                name:values.product_name,
                category:values.category,
                price:values.product_price,
                img_path:imageName,
                description:values.product_description,
            }
            console.log("DATAAAAAAAA: " + JSON.stringify(otherData))
            await axios.post('http://localhost:8800/api/products', otherData);

            addSuccess("You successfully added product")
            resetAllValues();
            // removeSelectedImage();
            RemoveValueFromObject('image')
        }
        catch(err){
            console.log("UPLOAD ERROR : " + err);
            addError("UPLOAD ERROR")
        }
    }

    const {values, errors, handleChanges, resetAllValues, RemoveValueFromObject, handleProductSubmit} = useForm(initialInputObject, onSubmitAddProduct);

    const removeSelectedImage = (event) =>{
        // event.preventDefault();
        values['image']=null;
    }

    console.log("IMG: " + JSON.stringify(values.image))
    console.log("DATA: " + values.product_name + " C: " + values.category + " Price " + values.product_price + " Disc: " + values.product_description)

    return(
        <div className='addProduct_container'>
            <h2>Add Product</h2>
            {/* <form className='addProduct_form' onSubmit={onSubmitAddProduct}>   */}
            <form className='addProduct_form' onSubmit={handleProductSubmit}>  

                <div className='addProduct_inputFields'>
                    <div className='addProduct_input'>
                        <label>Category</label>
                        {errors.category && <p>Select a category</p>}
                        {/* <select name='category' value={category} defaultValue={''} onChange={onChangeCategorySelect}> */}
                        <select name='category' value={values.category} defaultValue={''} onChange={handleChanges}>
                            <option value=''  disabled> Select Category </option>
                            {categoryOptions.map(category =>{
                                return <option values={category}>{category}</option>
                            })}
                        </select>
                    </div>

                    <div className='addProduct_input'>
                        <label>Name</label>
                        <input
                            type='text'
                            name='product_name'
                            // onChange={onChangeNameInput}
                            // value={name}
                            onChange={handleChanges}
                            value={values.product_name}
                            placeholder='Enter product name'
                        />
                        {errors.product_name && <p>{errors.product_name}</p>}
                    </div>
                    
                    <div className='addProduct_input'>
                        <label>Price</label>
                        <input
                            type='number'
                            name='product_price'
                            maxLength='2'
                            // onChange={onChangePriceInput}
                            // value={price}
                            onChange={handleChanges}
                            value={values.product_price}
                            placeholder='Enter product price'
                        />
                        {errors.product_price && <p>{errors.product_price}</p>}
                    </div>
                    <div className='addProduct_input'>
                        <label>Description</label>
                        <textarea 
                            rows="5" 
                            cols="20" 
                            className="product_descriptionBox"  
                            name="product_description"
                            // onChange={onChangeDescriptionInput} 
                            // value={description}
                            onChange={handleChanges} 
                            value={values.product_description}
                        />
                        {errors.product_description && <p>{errors.product_description}</p>}
                    </div>
                </div>

                <div className='addProduct_images'>
                    <div className='addProduct_input'>
                        <label>Image</label>
                        {errors.image && <p>Import a image</p>}
                        <input type="file" name="image" onChange={handleChanges} />
                    </div>

                    <div className='image_place'>
                        {values.image && (
                            <div className='image_container'>
                                <img
                                    src={URL.createObjectURL(values.image)}
                                    alt="Product"
                                />
                                <button onClick={removeSelectedImage} className='removeImageButton'>
                                    Remove Image
                                </button>
                            </div>
                            
                        )}
                    </div>
                </div>

                <div className='button_container'>
                    <button>Add Product</button>
                </div>
                
            </form>
        </div>
    )
}

export default AddProduct;