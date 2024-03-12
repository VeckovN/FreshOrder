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
            const res = await axiosJWT.get(`http://localhost:8800/api/products/category/${category}`, {headers2});
            const products = res.data;
            products.forEach(element => {
                console.log(element);
            });
            setCategoryItems(products);
        }
        catch(err){
            console.log("Err: " + err);
        }
    }

    const onShowCategoryItems = (selectedCategory) =>{
        if(category == selectedCategory)
            setCategory('');
        else{
            setCategory(selectedCategory);
            fetchProductsByCategory(selectedCategory);
        }
        //unshown the DelteModal on category select
        // setDeleteModal({show:false})
        
    }

    //Triggered in ProductItem compoennt(on Edit,SDel or Del action to reFetch users)
    const onChangeProduct = () =>{
        // //re Fetch showned items
        fetchProductsByCategory(category)
    }

    return (
        <div className='products-container'>
            <div className='add-product-part'>
                <h1 className='product-title'>Add new product</h1> 
                    <AddProduct
                        isChanged={onChangeProduct}
                    />
            </div>

            <div className='products-category-part'>
                <h1 className='product-title'>Edit Producs</h1>
                <div className='products-category'>
                    {categoryOptions.map(el =>{
                        return (
                        <div className={`category ${category===el ? 'active-category' : ''}`}>
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