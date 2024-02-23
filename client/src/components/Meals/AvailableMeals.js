import React,{useState, useContext, useEffect} from 'react'
import axios from 'axios';
import MealItem from './Item/MeaItem';
import categoryContext from '../../store/category-context';

import './AvailableMeal.css'

//!!!HIGH ORDER COMPONENT(Refactore THIS )
//https://www.robinwieruch.de/react-higher-order-components/

const AvailableMeals = props =>{
    const [filteredProducts, setFilteredProducts] = useState(null);
    //this triggered a re-rendering
    const ctxCategory = useContext(categoryContext);
    const categorySelected = ctxCategory.category;
    console.log("CATEGORY:" + categorySelected);

    useEffect(()=>{
        const fetchData = async()=>{
            //if this condition is omitted , products will be setted on categorySelect change (select any category)
            //but when u diselect category products will continue to exist
            if(categorySelected !=''){
                try{
                    const res = await axios.get(`http://localhost:8800/api/products/category/${categorySelected}`);
                    const products = res.data;

                    let notSoftDeleted = [];
                    notSoftDeleted = products.filter(el => {
                        return  el.isDeleted === false
                    })
                    // setFilteredProducts(products);
                    setFilteredProducts(notSoftDeleted);
                }catch(err){
                    console.log("ERROR: " + err);
                }
            }
            else{
                setFilteredProducts([]);
            }    
        }
        fetchData();

    },[categorySelected])

    let MealList;
    {filteredProducts ? 
        MealList = filteredProducts.map(meal =>(
            <MealItem
                key={meal._id}
                id={meal._id}
                name={meal.name}
                category={meal.category}
                description={meal.description}
                price={meal.price}
                img_path={meal.img_path}
            />
        ))
        : MealList=[];
    }

    return <div className='available-meal-container' id="menu" ref={props.sliderRef}> 
        {categorySelected && <h1 id="Meals"><span>{categorySelected}</span> Menu </h1>} 
        <div className='meal-list' id='meal-list'>
            {MealList} 
        </div>
    </div>
}

export default AvailableMeals