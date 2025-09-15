import {useState, useEffect, useContext} from 'react'
import { axiosJWT } from '../../../services/axiosJWTInstance';
import authContext from '../../../store/auth-context';
import { configureHeader } from '../../../utils/Helper';
import AddProduct from '../../components/AddProduct/AddProduct.js';
import './Products.css'
import ProductTable from '../../components/Products/ProductTable.js';

const Products = () =>{
    const {user} = useContext(authContext);
    const headers = configureHeader(user.accessToken);

    const categoryOptions = ['Pizza', 'Pasta', 'Burger' ,'Salad','Drinks', 'Desert']
    const [category, setCategory] = useState(categoryOptions[0]);
    const [categoryItems, setCategoryItems] = useState('');

    useEffect( ()=>{
        fetchProductsByCategory(categoryOptions[0]);
    },[]);

    const fetchProductsByCategory = async(category) =>{
        try{
            const headers2 = configureHeader(user.accessToken);
            const res = await axiosJWT.get(`/api/products/category/${category}`, {headers2});
            const products = res.data;
            setCategoryItems(products);
        }
        catch(err){
            console.error("Err: " + err);
        }
    }

    const onShowCategoryItems = (selectedCategory) =>{
        if(category !== selectedCategory){
            setCategory(selectedCategory);
            fetchProductsByCategory(selectedCategory);
        }
    }

    const onChangeProduct = () => fetchProductsByCategory(category) //reFetch showned items

    return (
        <div className='products-container'>
            <div className='add-product-part'>
                <h1 className='product-title'>Add new product</h1> 
                    <AddProduct
                        isChanged={onChangeProduct}
                    />
            </div>

            <div className='products-category-part'>
                <h1 className='product-title'>Products List</h1>
                <div className='products-category'>
                    {categoryOptions.map(el =>{
                        return (
                        <div key={el} className={`category ${category===el ? 'active-category' : ''}` }>
                            <div className='category-select'>
                                <div>{el}</div>
                                <button className='category-button' onClick={() => {onShowCategoryItems(el)}}>{category === el ? 'Selected' : 'Select'}</button>
                            </div> 
                        </div>
                        )
                    })}
                </div>

                {category && 
                <ProductTable
                    categoryItems={categoryItems}
                    headers={headers}
                    onChangeProduct={onChangeProduct}
                />
                }
            </div>
            
        </div>
    )
}

export default Products