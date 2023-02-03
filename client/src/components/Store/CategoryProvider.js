import react, {useState} from 'react';

import CategoryContext from './category-context';

const CategoryProvider = props =>{

    const [categoryState, setCategoryState] = useState('');

    const setCategoryHandler = category =>{
        // if(categoryState === category)
        //     //if is clicked on same(selected) category, then reset category(unSelect)
        //     setCategoryState('') 
        // else
        //     setCategoryState(category);
        setCategoryState(category);
    }

    const categoryContext ={
        category: categoryState,
        setCategory: setCategoryHandler
    };

    return(
        <CategoryContext.Provider value={categoryContext}>
            {props.children}{/* All between this CategoryContext component  */}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;