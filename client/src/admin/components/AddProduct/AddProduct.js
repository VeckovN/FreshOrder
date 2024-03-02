import {useContext} from 'react';
import { axiosJWT } from '../../../services/axiosJWTInstance';

import notificationContext from '../../../store/notification-context';
import authContext from '../../../store/auth-context';
import useForm from '../../../hooks/useForm';
import AddProductForm from './AddProductForm';
import { configureHeader } from '../../../utils/Helper';


const AddProduct = ({isChanged}) =>{
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
;
            const result = await axiosJWT.post('http://localhost:8800/api/products/create', formData, {headers});
            const imageName = result.data;

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
            RemoveValueFromObject('image');
            //refetch or just add product to Table
            isChanged();
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