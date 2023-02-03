import React from 'react';

const CategoryContext = React.createContext(
    {
        category: '',
        categorySelected: false,
        setCategory: (category) => {},
    }
);

export default CategoryContext;



