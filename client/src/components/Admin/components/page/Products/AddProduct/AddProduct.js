import {useState, useEffect, useContext} from 'react';
import { axiosJWT } from '../../../../../../services/axiosJWTInstance';

import notificationContext from '../../../../../Store/notification-context';
import authContext from '../../../../../Store/auth-context';
import useForm from '../../../../../../utils/Hooks/useForm';
import AddProductForm from './AddProductForm';
import { configureHeader } from '../../../../../../utils/Helper';


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
    const {user} = useContext(authContext)
    const headers = configureHeader(user.accessToken);

    const onSubmitAddProduct = async(event) =>{
        try{
            //upload image(call api request for it) image uplaod and product create are seperated calls
            const formData = new FormData();
            formData.append('image', values.image);

            //generatedName as request --- res.status(200).json(file.filename);
            const result = await axiosJWT.post('http://localhost:8800/api/products/create', formData, {headers});
            const imageName = result.data;

            addSuccess("You successfuly uploaded " + result.data);

            //useImgURL - image Name to create product 
            const otherData ={
                name:values.product_name,
                category:values.category,
                price:values.product_price,
                img_path:imageName,
                description:values.product_description,
            }
            await axiosJWT.post('http://localhost:8800/api/products', otherData, {headers});

            addSuccess("You successfully added product")
            resetAllValues();
            RemoveValueFromObject('image')
        }
        catch(err){
            addError("UPLOAD ERROR")
        }
    }

    const {values, errors, handleChanges, resetAllValues, RemoveValueFromObject, handleProductSubmit} = useForm(initialInputObject, onSubmitAddProduct);

    const removeSelectedImage = (event) =>{
        // event.preventDefault();
        values['image']=null;
    }

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