import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import notificationContext from '../../../../../Store/notification-context';
import useForm from '../../../../../../utils/Hooks/useForm';
import AddProductForm from './AddProductForm';


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
        <AddProductForm
            values={values}
            errors={errors}
            handleChanges={handleChanges}
            handleProductSubmit={handleProductSubmit}
            removeSelectedImage={removeSelectedImage}
            categoryOptions={categoryOptions}
        />
    )
}

export default AddProduct;