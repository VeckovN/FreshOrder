import {useState} from 'react';

import CategoryContext from './category-context';

const CategoryProvider = props =>{
    const [categoryState, setCategoryState] = useState('');

    const setCategoryHandler = category => setCategoryState(category);

    const categoryContext ={
        category: categoryState,
        setCategory: setCategoryHandler
    };

    return(
        <CategoryContext.Provider value={categoryContext}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;