import {useState, useEffect} from 'react';


const UpdateProduct = (props) =>{

    //obj passed as prop
    const productData = props.data;

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description, setDescription] = useState('');

    const onChangeNameInput = (e) =>{
        setName(e.target.value);
    }

    const onChangePriceInput = () =>{

    }

    const onChangeDescriptionInput = ()=>{

    }

    console.log("NAME: " + name);

    return(
        <div className='updateProduct_container'>
            <div className='updateProduct_input_container'>
                <div className='updateProduct_input'>
                    <div>Name: {productData.name}</div>
                    <input
                        type='text'
                        name='name'
                        // onChange={onChangeValue}
                        onChange={onChangeNameInput}
                        value={name}
                        placeholder='Enter product name'
                    />
                </div>

                <div className='updateProduct_input'>
                    <div>Price: {productData.price}</div>
                    <input
                        type='number'
                        name='price'
                        maxLength='2'
                        onChange={onChangePriceInput}
                        value={price}
                        placeholder='Enter product price'
                    />
                </div>

                <div className='updateProduct_input'>
                    <div>Description: {productData.description}</div>
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
        </div>
    )
}

export default UpdateProduct;