import CategoryItem  from './CategoryItem'
import pizzaCategoryImg from '../../../assets/category/PizzaCategoryE.jpg';
import pastaCategoryImg from '../../../assets/category/PastaCategoryE.jpg';
import burgersCategoryImg from '../../../assets/category/BurgersCategory.jpg';
import drinksCategoryImg from '../../../assets/category/DrinksCategoryE.jpg';
import desertCategoryImg from '../../../assets/category/DesertCategory.jpg'
import saladCategoryImg from '../../../assets/category/SaladCategory.jpg'
import './CategoryItem.css'

const CategoryMeals = props =>{ 
    return <div className='categoryMain' id="category">
        <h2>Select Category</h2>
        <div className='categoryItems'>
            <CategoryItem itemName='Pizza' image={pizzaCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Pasta' image={pastaCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Burger' image={burgersCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Salad' image={saladCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Drinks' image={drinksCategoryImg} sliderRef={props.sliderRef}/>
            <CategoryItem itemName='Desert' image={desertCategoryImg} sliderRef={props.sliderRef}/>
        </div>
    </div>

}

export default CategoryMeals