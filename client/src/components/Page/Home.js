import react from 'react';
import Card from '../UI/Card'
import Welcome from './Welcome'
import AboutUs from './AboutUs'
import CategoryMeals from '../Meals/Category/CategoryMeals';
import AvailableMeals from '../Meals/AvailableMeals'
import CategoryProvider from '../Store/CategoryProvider';

import './Home.css'

const Home = () =>{
    console.log("HOMEEEEEE");
    return (
        <main className='home-container'>
          <Card>
            <Welcome />
          </Card>

          <CategoryProvider>
            <CategoryMeals />
            <AvailableMeals />
          </CategoryProvider>

          <Card>
            <AboutUs />
          </Card>

          {/* HOME PAGE */} 
        </main>
    )
}


export default Home;