
import ProductItem from "./ProductItem";
import '../../page/Products/ProductTable.css';

const ProductTable = ({categoryItems, onChangeProduct, headers}) =>{

    return(
        <div className='product-table-container'>
            <table className='category-table'>
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
        </div>
    )
}

export default ProductTable;