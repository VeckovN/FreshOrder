import {useContext, useEffect, useState} from 'react'
import {Link} from 'react-scroll';

import './CategoryItem.css';
// import {Link} from 'react-scroll';
//We should use useContext because we need to use this information(clicked Category) for 
//showing items with this category
import categoryContext from '../../Store/category-context';




const CategoryItem = props =>{

    //this category selected
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
            //MAYBE HERE FETCH PRODUCTS BY CATEGORY AND STORE IT IN CTX
        }   
        else
        {
            console.log("You Unselect" );
            ctxCategory.setCategory('');  
            setSelected(false); 
        }
    }

    let selectedCategoryItem = selected ? 'unselected' : '';

    return(     
        <div className={'item ' + selectedCategoryItem}>
            <img src={props.image} alt={`${props.itemName} Category Menu`}></img> 
            <div className='content'>
                <p className='title'>{props.itemName}</p>      
                {/* {selected ? <p>Info Showned</p> : <p>Info Unshowned </p>} */}
                <button onClick={clickedCardHandler}>{selected ? 'Deselect' : 'Select'}
                </button>    
                {/* <Link className='LinkCategory' to='meal_list' spy={true} offset={-70} smooth={true} onSetActive={clickedCardHandler} >{selected ? 'Deselect' : 'Select'}</Link> */}
            </div>
        </div>
    )
        
}

export default CategoryItem