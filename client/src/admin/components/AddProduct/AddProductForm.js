import './AddProductForm.css'

const AddProductForm = ({values, errors, categoryOptions, removeSelectedImage, handleChanges, handleProductSubmit }) =>{

    return (
        <div className='add-product-container'>
            <form onSubmit={handleProductSubmit}>  

                <div className='add-product-input-fields'>
                    <div className='add-product-input'>
                        <label>Category</label>
                        <select name='category' value={values.category} defaultValue={''} onChange={handleChanges}>
                            <option value=''  disabled> Select Category </option>
                            {categoryOptions.map(category =>{
                                return <option values={category} key={`cat-${category}`}>{category}</option>
                            })}
                        </select>
                        {errors.category && <p className='error-product'>Select a category</p>}
                    </div>

                    <div className='add-product-input'>
                        <label>Price</label>
                        <input
                            type='number'
                            name='product_price'
                            maxLength='2'
                            onChange={handleChanges}
                            value={values.product_price}
                            placeholder='Enter product price'
                        />
                        {errors.product_price && <p className='error-product'>{errors.product_price}</p>}
                    </div>
                    <div className='add-product-input'>
                        <label>Description</label>
                        <textarea 
                            rows="5" 
                            cols="20" 
                            className="product-description-box"  
                            name="product_description"
                            placeholder='Enter product Description'
                            onChange={handleChanges} 
                            value={values.product_description}
                        />
                        {errors.product_description && <p className='error-product'>{errors.product_description}</p>}
                    </div>
                </div>

                <div className='add-product-input-fields'>
                    <div className='add-product-input'>
                        <label>Name</label>
                        <input
                            type='text'
                            name='product_name'
                            onChange={handleChanges}
                            value={values.product_name}
                            placeholder='Enter product name'
                        />
                        {errors.product_name && <p className='error-product'>{errors.product_name}</p>}
                    </div>
                    <div className='add-product-input'>
                        <label>Image</label>
                        {errors.image && <p className='error-product'>Import a image</p>}
                        <input type="file" name="image" className='image-choose-input' onChange={handleChanges} />
                    </div>

                    <div className='image-place'>
                        {values.image && (
                            <div className='image-container'>
                                <img
                                    src={URL.createObjectURL(values.image)}
                                    alt="Product"
                                />
                                <button onClick={removeSelectedImage} className='remove-image-button'>
                                    Remove Image
                                </button>
                            </div>

                        )}
                    </div>
                </div>

                <div className='button-container'>
                    <button>Add Product</button>
                </div>

            </form>
        </div>
    )

}

export default AddProductForm