const AddProductForm = ({values, errors, categoryOptions, removeSelectedImage, handleChanges, handleProductSubmit }) =>{

    return (
        <div className='addProduct_container'>
            {/* <h2>Add Product</h2> */}
            {/* <form className='addProduct_form' onSubmit={onSubmitAddProduct}>   */}
            <form className='addProduct_form' onSubmit={handleProductSubmit}>  

                <div className='addProduct_inputFields'>
                    <div className='addProduct_input'>
                        <label>Category</label>
                        {/* <select name='category' value={category} defaultValue={''} onChange={onChangeCategorySelect}> */}
                        <select name='category' value={values.category} defaultValue={''} onChange={handleChanges}>
                            <option value=''  disabled> Select Category </option>
                            {categoryOptions.map(category =>{
                                return <option values={category}>{category}</option>
                            })}
                        </select>
                        {errors.category && <p className='error_product'>Select a category</p>}
                    </div>

                    <div className='addProduct_input'>
                        <label>Name</label>
                        <input
                            type='text'
                            name='product_name'
                            onChange={handleChanges}
                            value={values.product_name}
                            placeholder='Enter product name'
                        />
                        {errors.product_name && <p className='error_product'>{errors.product_name}</p>}
                    </div>

                    <div className='addProduct_input'>
                        <label>Price</label>
                        <input
                            type='number'
                            name='product_price'
                            maxLength='2'
                            onChange={handleChanges}
                            value={values.product_price}
                            placeholder='Enter product price'
                        />
                        {errors.product_price && <p className='error_product'>{errors.product_price}</p>}
                    </div>
                    <div className='addProduct_input'>
                        <label>Description</label>
                        <textarea 
                            rows="5" 
                            cols="20" 
                            className="product_descriptionBox"  
                            name="product_description"
                            onChange={handleChanges} 
                            value={values.product_description}
                        />
                        {errors.product_description && <p className='error_product'>{errors.product_description}</p>}
                    </div>
                </div>

                <div className='addProduct_images'>
                    <div className='addProduct_input'>
                        <label>Image</label>
                        {errors.image && <p className='error_product'>Import a image</p>}
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

export default AddProductForm