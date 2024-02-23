import {useState, useContext} from 'react'
import { axiosJWT } from '../../../services/axiosJWTInstance';
import authContext from '../../../store/auth-context';
import { configureHeader } from '../../../utils/Helper';
import AddProduct from '../../components/AddProduct/AddProduct.js';
import ProductItem from '../../components/ProductItem/ProductItem.js';
import './Products.css'

const Products = () =>{
    const {user} = useContext(authContext);
    const headers = configureHeader(user.accessToken);

    const categoryOptions = ['Pizza', 'Pasta', 'Burger' ,'Salad','Drinks', 'Desert']

    const [category, setCategory] = useState('');
    const [categoryItems, setCategoryItems] = useState('');
    const [showAddProduct, setShowAddProduct] = useState(false);

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

    const onShowCategoryItems = (category) =>{
        setCategory(category);
        fetchProductsByCategory(category);
    }

    //Triggered in ProductItem compoennt(on Edit,SDel or Del action to reFetch users)
    const onChangeProduct = () =>{
        // //re Fetch showned items
        fetchProductsByCategory(category)
    }

    return (
        <main className='mainAdmin'>
            <div className='products_container'>
                <h1 className='product_title'>Products</h1>
                <button className='addProduct_button' onClick={() => {setShowAddProduct(!showAddProduct)}}>Add Product</button>
                
                {/* on addProduct click button */}
                {showAddProduct && <AddProduct/>}
                
                <div className='products_category'>
                    {categoryOptions.map(el =>{
                        return (
                        <div className='category'>
                            <div className='category_select'>
                                <h1>{el}</h1>
                                <button className='category_show_button' onClick={() => {onShowCategoryItems(el)}}>Show {el}</button>
                            </div>
                            
                            {category== el 
                                && 
                                <table className='category_table'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Description</th>
                                                <th>IsDeleted</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoryItems && categoryItems.map(item =>{
                                                return(
                                                    <ProductItem item={item} isChanged={onChangeProduct} headers={headers} ></ProductItem>
                                                )
                                            })}
                                        </tbody>
                                    </table> 
                                }
                            </div>
                        )

                    })}
                </div>
                
            </div>
         
        </main>
    )
}

export default Products