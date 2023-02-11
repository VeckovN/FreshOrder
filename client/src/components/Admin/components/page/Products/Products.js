import {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom';

import axios from 'axios';

import AddProduct from './AddProduct';
import ProductItem from './ProductItem';
import UpdateProduct from './UpdateProduct';
import './Products.css'

const Products = () =>{

    const categoryOptions = ['Pizza', 'Pasta', 'Burger' ,'Salad','Drinks', 'Desert']

    const [category, setCategory] = useState('');
    const [categoryItems, setCategoryItems] = useState('');

    const [showAddProduct, setShowAddProduct] = useState(false);

    //when is EditButton click then data of clicked product will be store in this state
    // const [editData, setEditData] = useState();

    const fetchProductsByCategory = async(category) =>{
        try{
            const res = await axios.get(`http://localhost:8800/api/products/category/${category}`);
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
        // //re Fetch the showned items
        fetchProductsByCategory(category)
    }

    const onAddProductHandler = () =>{
        
    }


    //productData returend from ProductItem(child commponent)
    // const onEditProductHandler = (productData)=>{
    //     // alert("PRDATA : " + JSON.stringify(productData))
    //     setEditData(productData);
    // }

    return (
        <main className='mainAdmin'>
            <div className='products_container'>
                <h1 className='product_title'>Products</h1>
                {/* nested route -> /products/add */}
                {/* <Link to='/products/add'>Add Product</Link>  will lead to index/products/add (index is products -> /products/products/add)  */}
                {/* wihtout /add because this add is neasted */}
                {/* <Link to='add'>Add Product Link</Link>  */}
                <button className='addProduct_button' onClick={() => {setShowAddProduct(!showAddProduct)}}>Add Product</button>
                
                {showAddProduct && <AddProduct></AddProduct>}
                {/* <AddProduct></AddProduct> */}
                
                
                <div className='products_category'>
                    {/* Loop through category */}
                    {categoryOptions.map(el =>{
                        return (
                        // <AdminCategory ></AdminCategory>
                        <div className='category'>
                            {/* <h1>Pizza</h1> */}
                            <div className='category_select'>
                                <h1>{el}</h1>
                                <button className='category_show_button' onClick={() => {onShowCategoryItems(el)}}>Show {el}</button>
                            </div>
                            
                            {/* {editData && <UpdateProduct data={editData}></UpdateProduct>} */}
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
                                                   
                                                    <ProductItem item={item} isChanged={onChangeProduct} ></ProductItem>
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