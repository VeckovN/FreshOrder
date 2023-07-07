import {useContext, useEffect, useState} from 'react'
import {Link} from 'react-scroll';

import './CategoryItem.css';
// import {Link} from 'react-scroll';
//We should use useContext because we need to use this information(clicked Category) for 
//showing items with this category
import categoryContext from '../../Store/category-context';




const CategoryItem = props =>{

    const [selected, setSelected] = useState(false);
    const ctxCategory = useContext(categoryContext);
    const category = ctxCategory.category;
    //any category selected

    //when is category changed, all non selected Category set on false
    //This allows only one category to be selected
    useEffect(() => {
        if(category !== props.itemName && category !=='')
        {
            // disable_click = true;
            setSelected(false);
            console.log("USE EFFECT");
        }
    }, [category]); 

    const clickedCardHandler = () =>{
        if(!selected){
            console.log('You select: ' + props.itemName);      
            ctxCategory.setCategory(props.itemName);
            setSelected(true);
            //ON category CLICK SET THE sliderRef 
            props.sliderRef?.current.scrollIntoView({behavior: 'smooth'})
            //THIS REF IS USED on DIV in AvailabelMeals with ref={sliderRef}
        }   
        else
        {
            console.log("You Unselect" );
            ctxCategory.setCategory('');  
            setSelected(false); 
        }
    }

    //let selectedCategoryItem = selected ? 'unselected' : '';
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
            <div className='content'>
                <p className='title'>{props.itemName}</p>      
                {/* {selected ? <p>Info Showned</p> : <p>Info Unshowned </p>} */}
                {/* <button onClick={clickedCardHandler} className=''>{selected ? 'Deselect' : 'Select'} */}
                <button onClick={clickedCardHandler} className={buttonType}>{buttonType}
                </button>    
            </div>
        </div>
    )
        
}

export default CategoryItem