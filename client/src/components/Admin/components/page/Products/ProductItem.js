import {useState, useEffect, useContext} from 'react'

import axios from 'axios';

import notificationContext from '../../../../Store/notification-context';


//isChanged is handler which trach changing on this compoenent and
//notify parent(Product) to reFetch new updated items
const ProductItem = ({item, isChanged}) =>{

    const productItem = item._id;

    //state used for notify parrent(Product.js) component to reFetch showed items
    //to get new refresh(updated) items
    // const [isChanged, setIsChanged] = useState();

    const {addSuccess, addError} = useContext(notificationContext);

    const onEditProduct = ()=>{

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
    const onDeleteProduct = () =>{

    }


    return(
        <tr className={item.isDeleted && 'isDeleted '}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.description}</td>
            <td>{item.isDeleted ? 'Yes' : 'No'}</td>
            <td>
                <button onClick={onEditProduct}>Edit</button>
                <button onClick={onSoftDeleteProduct}>SDel</button>
                <button onClick={onDeleteProduct}>Del</button>
            </td>
        </tr>
    )

}

export default ProductItem;