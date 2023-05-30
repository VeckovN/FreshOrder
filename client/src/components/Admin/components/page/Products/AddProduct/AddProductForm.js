const AddProductForm = ({values, errors, onChangeInput, onChangeImage, }) =>{

    return (
        <div className='addProduct_container'>
            <h2>Add Product</h2>
            <form className='addProduct_form' onSubmit={onSubmitAddProduct}>  

                <div className='addProduct_inputFields'>
                    <div className='addProduct_input'>
                        <label>Category</label>
                        {categoryError && <p>Select a category</p>}
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
                        {priceError && <p>{priceError}</p>}
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
                        {descriptionError && <p>{descriptionError}</p>}
                    </div>
                </div>

                <div className='addProduct_images'>
                    <div className='addProduct_input'>
                        <label>Image</label>
                        {imageError && <p>Import a image</p>}
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

export default AddProductForm