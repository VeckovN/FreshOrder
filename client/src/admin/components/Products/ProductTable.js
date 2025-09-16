
import ProductItem from "./ProductItem";
import './ProductTable.css';

const ProductTable = ({categoryItems, onChangeProduct, headers}) =>{

    return(
        <div className='product-table-container'>
            <table className='category-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>IsDel</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryItems ? categoryItems.map(item =>{
                        return(
                            <ProductItem 
                                key={`item-${item._id}`} 
                                item={item} 
                                isChanged={onChangeProduct} 
                                headers={headers}
                                />       
                        )
                    })
                    :
                    <tr>
                        <td>No items found</td>
                    </tr>
                }
                </tbody>
            </table> 
        </div>
    )
}

export default ProductTable;