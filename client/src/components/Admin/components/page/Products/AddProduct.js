import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import notificationContext from '../../../../Store/notification-context';


const AddProduct = () =>{
    // name
    // category
    // description
    // price
    // img_path

    const {addSuccess, addError} = useContext(notificationContext);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState('');

    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState('');

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const [image, setImage] = useState(); 
    const [imageError, setImageError] = useState('');
    

    const categoryOptions = ['Pizza', 'Pasta', 'Special' ,'Drinks', 'Desert', 'Salat']


    const onChangeValue = (e) =>{
        
    }

    const onChangeNameInput =(e)=>{
        console.log("TYPE: " + typeof(e.target.value));
        //check number as input value
        setName(e.target.value);
    }
    const onChangeCategorySelect = (e) =>{
        setCategory(e.target.value)
    }
    
    const onChangePriceInput = (e) =>{
        setPrice(e.target.value)
    }
    const onChangeDescriptionInput = (e) =>{
        setDescription(e.target.value)
    }

    const onImageChange = (e) =>{
        if (e.target.files && e.target.files.length > 0) {}
            setImage(e.target.files[0]);
    }
    const removeSelectedImage = () =>{
        setImage();
    }

    console.log("IMG: " + JSON.stringify(image))

    const resetInputs = () =>{
        setName('');
        setCategory('');
        setPrice('');
        setDescription('');
        setImage('');
    }

    const onSubmitAddProduct = async(event) =>{
        event.preventDefault();

        if(name =='' || category =='' || price =='' || description ==''){
            addError("Inputs can not be empty!!!");
            return
        }
        if(!image){ 
            addError("Choose a image")
            return
        }

        // imagePath will be created in Backaned on Upload (currentImgName + dateNow)
        else{
            try{
                //upload image(call api request for it) image uplaod and product create are seperated calls
                const formData = new FormData();
                formData.append('image', image);

                //generatedName as request --- res.status(200).json(file.filename);
                const result = await axios.post('http://localhost:8800/api/products/create', formData);
                const imageName = result.data;
                addSuccess("You successfuly uploaded " + result.data);

                console.log("UPLOAD RESULT :" + result.data);
                //useImgURL - image Name to create product 
                const otherData ={
                    name:name,
                    category:category,
                    price:price,
                    img_path:imageName,
                    description:description,
                }
                console.log("DATAAAAAAAA: " + JSON.stringify(otherData))
                await axios.post('http://localhost:8800/api/products', otherData);
  
                addSuccess("You successfully added product")
                resetInputs();
                removeSelectedImage();
            }
            catch(err){
                console.log("UPLOAD ERROR : " + err);
                addError("UPLOAD ERROR")
            }
        }
    }
    console.log("DATA: " + name + " C: " + category + " Price " + price + " Disc: " + description)

    return(
        <div className='addProduct_container'>
            <h2>Add Product</h2>
            <form className='addProduct_form' onSubmit={onSubmitAddProduct}>  

                <div className='addProduct_inputFields'>
                    <div className='addProduct_input'>
                        <label>Category</label>
                        <select name='category' value={category} defaultValue={''} onChange={onChangeCategorySelect}>
                            <option value=''  disabled> Select Category </option>
                            <option value='Pizza'>Pizza</option>
                            <option value='Pasta'>Pasta</option>
                            <option value='Burger'>Burger</option>
                            <option value='Salad'>Salad</option>
                            <option value='Desert'>Desert</option>
                            <option value='Drinks'>Drinks</option>
                        </select>
                    </div>

                    <div className='addProduct_input'>
                        <label>Name</label>
                        <input
                            type='text'
                            name='name'
                            onChange={onChangeNameInput}
                            value={name}
                            placeholder='Enter product name'
                        />
                        {nameError && <p>{nameError}</p>}
                    </div>
                    
                    <div className='addProduct_input'>
                        <label>Price</label>
                        <input
                            type='number'
                            name='price'
                            maxLength='2'
                            onChange={onChangePriceInput}
                            value={price}
                            placeholder='Enter product price'
                        />
                    </div>
                    <div className='addProduct_input'>
                        <label>Description</label>
                        <textarea 
                            onChange={onChangeDescriptionInput} 
                            rows="5" 
                            cols="20" 
                            className="descriptionBox"  
                            name="description"
                            value={description}
                        />
                        
                    </div>
                </div>

                <div className='addProduct_images'>
                    <div className='addProduct_input'>
                        <label>Image</label>
                        <input type="file" name="image" onChange={onImageChange} />
                    </div>

                    <div className='image_place'>
                        {image && (
                            <div className='image_container'>
                                <img
                                    src={URL.createObjectURL(image)}
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