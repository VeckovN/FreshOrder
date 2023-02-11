import react, {useState, useContext} from 'react'

import CategoryItem  from './CategoryItem'

import './CategoryItem.css'
import pizzaCategoryImg from '../../../assets/category/PizzaCategoryE.jpg';
import pastaCategoryImg from '../../../assets/category/PastaCategoryE.jpg';
import mealsCategoryImg from '../../../assets/category/MealsCategoryE.jpg';
import dringsCategoryImg from '../../../assets/category/DrinksCategoryE.jpg';

import categoryContext from '../../Store/category-context'


const CategoryMeals = props =>{ 

    return <div className='categoryMain' id="category">
        <h2>Select Category</h2>
        <div className='categoryItems'>
            {/* Fetch all category from DB and render CategoryItem for Every category */}
            {/* <button value='Pizza' onClick={testClickHanlder}> <CategoryItem itemName='Pizza' onCategory={onSelectCategory}/> </button> */}
            <CategoryItem itemName='Pizza' image={pizzaCategoryImg}/>
            <CategoryItem itemName='Pasta' image={pastaCategoryImg}/>
            <CategoryItem itemName='Burger' image={mealsCategoryImg}/>
            <CategoryItem itemName='Salad' image={pastaCategoryImg}/>
            <CategoryItem itemName='Drinks' image={dringsCategoryImg}/>
            <CategoryItem itemName='Desert' image={mealsCategoryImg}/>
        </div>
    </div>
    //'Pizza', 'Pasta', 'Burger' ,'Salat','Drinks', 'Desert'

}

export default CategoryMeals