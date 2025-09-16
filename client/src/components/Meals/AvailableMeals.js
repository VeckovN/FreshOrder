import {useState, useContext, useEffect} from 'react'
import { axiosBase } from '../../services/axiosJWTInstance.js';
import MealItem from './Item/MeaItem';
import categoryContext from '../../store/category-context.js';
import LoadingCircleSpinner from '../../utils/LoadingCircleSpinner.js';

import './AvailableMeal.css'
//!!!HIGH ORDER COMPONENT(Refactore THIS )
//https://www.robinwieruch.de/react-higher-order-components/

const AvailableMeals = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(null);
    //this triggered a re-rendering
    const ctxCategory = useContext(categoryContext);
    const categorySelected = ctxCategory.category;

    useEffect(()=>{
        const fetchData = async()=>{
            //if this condition is omitted , products will be setted on categorySelect change (select any category)
            //but when u diselect category products will continue to exist
            if(categorySelected !=''){
                try{
                    setIsLoading(true);
                    const res = await axiosBase.get(`/api/products/category/${categorySelected}`);
                    const products = res.data;

                    let notSoftDeleted = [];
                    notSoftDeleted = products.filter(el => {
                        return  el.isDeleted === false
                    })
                    setFilteredProducts(notSoftDeleted);
                    setIsLoading(false);
                }catch(err){
                    console.error("ERROR: " + err);
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
        
        {isLoading 
            ?
                <div className='mealSpinner'>
                    <LoadingCircleSpinner/>
                </div> 
            :
            <div className='meal-list' id='meal-list'>
                {MealList} 

            </div>
        }
    </div>
}

export default AvailableMeals