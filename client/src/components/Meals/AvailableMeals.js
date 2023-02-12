import react,{useState, useContext, useEffect, useRef} from 'react'
import axios from 'axios';

import Meals from './MealsData';
import MealItem from './Item/MeaItem';

import './AvailableMeal.css'

import Card from '../UI/Card'

import categoryContext from '../Store/category-context';

//!!!HIGH ORDER COMPONENT(Refactore THIS )
//https://www.robinwieruch.de/react-higher-order-components/

const AvailableMeals = props =>{
    console.log("AVAILABLEMEALS");

    // const [filteredMeals, setFilteredMeals] = useState('');
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

                    console.log("NOT SOFT DELETE: " + JSON.stringify(notSoftDeleted));

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

    // const filtered = Meals.filter(meal => meal.category === categorySelected);    

    // const MealList = filtered.map(meal =>(
    //     <MealItem
    //         key={meal.id}
    //         id={meal.id}
    //         name={meal.name}
    //         category={meal.category}
    //         description={meal.description}
    //         price={meal.price}
    //         img_name={meal.img_name}
    //     />
    // ))

    // const filtered = Meals.filter(meal => meal.category === categorySelected);    

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

    // return <p>Meals: {Meals[1].id}</p>
    return <div className='available_meal_container' id="menu" ref={props.sliderRef}> 
        {categorySelected && <h1 id="Meals"><span>{categorySelected}</span> Menu </h1>} 
        <div className='meal_list' id='meal_list'>
            {MealList} 
        </div>
    </div>

}

export default AvailableMeals