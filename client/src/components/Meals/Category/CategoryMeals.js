import react, {useState, useContext} from 'react'

import CategoryItem  from './CategoryItem'

import './CategoryItem.css'
import pizzaCategoryImg from '../../../assets/category/PizzaCategoryE.jpg';
import pastaCategoryImg from '../../../assets/category/PastaCategoryE.jpg';
import burgersCategoryImg from '../../../assets/category/BurgersCategory.jpg';
import drinksCategoryImg from '../../../assets/category/DrinksCategoryE.jpg';
import desertCategoryImg from '../../../assets/category/DesertCategory.jpg'
import saladCategoryImg from '../../../assets/category/SaladCategory.jpg'

import categoryContext from '../../Store/category-context'


const CategoryMeals = props =>{ 

    return <div className='categoryMain' id="category">
        <h2>Select Category</h2>
        <div className='categoryItems'>
            {/* Fetch all category from DB and render CategoryItem for Every category */}
            {/* <button value='Pizza' onClick={testClickHanlder}> <CategoryItem itemName='Pizza' onCategory={onSelectCategory}/> </button> */}
            <CategoryItem itemName='Pizza' image={pizzaCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Pasta' image={pastaCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Burger' image={burgersCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Salad' image={saladCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Drinks' image={drinksCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Desert' image={desertCategoryImg} sliderRef={props.sliderRef}/>
        </div>
    </div>
    //'Pizza', 'Pasta', 'Burger' ,'Salat','Drinks', 'Desert'

}

export default CategoryMeals