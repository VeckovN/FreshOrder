import {useContext, useEffect, useState} from 'react'
import categoryContext from '../../../store/category-context.js';
import './CategoryItem.css';

const CategoryItem = props =>{
    const [selected, setSelected] = useState(false);
    const ctxCategory = useContext(categoryContext);
    const category = ctxCategory.category;

    //when is category changed, all non selected Category set on false
    //This allows only one category to be selected
    useEffect(() => {
        if(category !== props.itemName && category !=='')
        {
            setSelected(false);
        }
    }, [category]); 

    const clickedCardHandler = () =>{
        if(!selected){
            console.log('You select: ' + props.itemName);      
            ctxCategory.setCategory(props.itemName);
            setSelected(true);
            props.sliderRef?.current.scrollIntoView({behavior: 'smooth'})
            //this ref is used on DIV in AvailabelMeals with ref={sliderRef}
        }   
        else
        {
            console.log("You Unselect" );
            ctxCategory.setCategory('');  
            setSelected(false); 
        }
    }

    let selectedCategoryItem;
    let buttonType;

    if(selected){
        selectedCategoryItem = 'unselected'
        buttonType = "Deselect"
    }
    else{
        selectedCategoryItem = '';
        buttonType = 'Select'
    }

    return(     
        <div className={'item ' + selectedCategoryItem}>
            <img src={props.image} alt={`${props.itemName} Category Menu`}></img> 
            <div className={`content ${selected ? 'selected-content' : ''}`}>
                <p className='title'>{props.itemName}</p>      
                <button onClick={clickedCardHandler} className={buttonType}>{buttonType}
                </button>    
            </div>
        </div>
    )
        
}

export default CategoryItem