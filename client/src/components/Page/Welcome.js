import react from 'react'

import './Page.css';

const Welcome = () =>{


    //id required for Link component from 'react-sc
    return <div className='welcome' id='welcome'>
        <h1>Order Fast, Recieve Fast</h1>

        <p>You can choose and order your favorite meal in one second.
            Our delivery service will deliver the order to you in the shortest time
        </p>

        <p>
            Order your food safely and enjoy it.
        </p>
    </div>

}

export default Welcome