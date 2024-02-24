import React, {useRef} from 'react';

import Card from '../components/UI/Card';
import Welcome from './Welcome'
import AboutUs from './AboutUs'
import CategoryMeals from '../components/Meals/Category/CategoryMeals';
import AvailableMeals from '../components/Meals/AvailableMeals'
import CategoryProvider from '../store/CategoryProvider';

import './Home.css'

//react Memo is used because when is click on cart to open modal (showModal state is changed in App.js )
//and this trigger all App.js children component reRendering(this Home page will be always reREnder ) 
//React.Memo prevent unnecessary rerendering when the props of the parrent component changed(App.js)
const Home = React.memo( () =>{

    //slide on clicked category item
    const sliderRef = useRef(null);
  
    return (
        <main className='home-container'>
          <Card>
            <Welcome />
          </Card>

          <CategoryProvider>
            <CategoryMeals  sliderRef={sliderRef}/>
            <AvailableMeals sliderRef={sliderRef}/>
          </CategoryProvider>

          <Card>
            <AboutUs />
          </Card>

          {/* HOME PAGE */} 
        </main>
    )
})


export default Home;