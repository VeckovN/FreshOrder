import {useRef} from 'react';

import Card from '../UI/Card'
import Welcome from './Welcome'
import AboutUs from './AboutUs'
import CategoryMeals from '../Meals/Category/CategoryMeals';
import AvailableMeals from '../Meals/AvailableMeals'
import CategoryProvider from '../Store/CategoryProvider';

import './Home.css'

const Home = () =>{

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
}


export default Home;