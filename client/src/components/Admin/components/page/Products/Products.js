import {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom';

import axios from 'axios';

import AddProduct from './AddProduct';
import ProductItem from './ProductItem';
import './Products.css'

const Products = () =>{

    const categoryOptions = ['Pizza', 'Pasta', 'Meals' ,'Drinks', 'Desert', 'Salat']

    const [category, setCategory] = useState('');
    const [categoryItems, setCategoryItems] = useState('');

    const [showAddProduct, setShowAddProduct] = useState(false);

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
        // alert("CATEGORY: " + category);
        setCategory(category);

        fetchProductsByCategory(category);

        // try{
        //     const res = await axios.get(`http://localhost:8800/api/products/category/${category}`);
        //     const products = res.data;
        //     products.forEach(element => {
        //         console.log(element);
        //     });
        //     setCategoryItems(products);
        // }
        // catch(err){
        //     console.log("Err: " + err);
        // }
    }

    //Triggered in ProductItem compoennt(on Edit,SDel or Del action to reFetch users)
    const onChangeProduct = () =>{
        // //re Fetch the showned items
        fetchProductsByCategory(category)
    }

    const onAddProductHandler = () =>{
        
    }


    return (
        <main className='mainAdmin'>
            <div className='products_container'>
                <h1 className='product_title'>Products</h1>
                {/* nested route -> /products/add */}
                {/* <Link to='/products/add'>Add Product</Link>  will lead to index/products/add (index is products -> /products/products/add)  */}
                {/* wihtout /add because this add is neasted */}
                {/* <Link to='add'>Add Product Link</Link>  */}
                <button className='addProduct' onClick={() => {setShowAddProduct(!showAddProduct)}}>Add Product</button>
                
                {showAddProduct && <AddProduct></AddProduct>}
                {/* <AddProduct></AddProduct> */}
                
                
                <div className='products_category'>
                    {/* Loop through category */}
                    {categoryOptions.map(el =>{
                        return (
                        // <AdminCategory ></AdminCategory>
                        <div className='category'>
                            {/* <h1>Pizza</h1> */}
                            <h1>{el}</h1>
                            <button onClick={() => {onShowCategoryItems(el)}}>Show{el}</button>
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
                                                    // <tr>
                                                    //     <td>{item.name}</td>
                                                    //     <td>{item.price}</td>
                                                    //     <td>{item.description}</td>
                                                    //     <td>{item.isDeleted ? 'Yes' : 'No'}</td>
                                                    //     <td>
                                                    //         {/* <button onClick={onEditProduct}>Edit</button>
                                                    //         <button onClick={onSoftDeleteProduct}>SDel</button>
                                                    //         <button onClick={onDeleteProduct}>Del</button> */}
                                                    //         <button>Edit</button>
                                                    //         <button>SDel</button>
                                                    //         <button>Del</button>
                                                    //     </td>
                                                    // </tr>
                                                    <ProductItem item={item} isChanged={onChangeProduct}></ProductItem>
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