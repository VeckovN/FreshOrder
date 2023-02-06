import {useState, useEffect} from 'react';

import './LoadingSpinner.css'

const LoadingSpinner = () =>{
    return(
        // <div className='spinner_container'>
        //     <div>LOADING</div>
        // </div>

        <div class="spinner_container">
            <div className='spinner_ellipsis'>
                <div className='spinner_dot'>
                </div>
                <div className='spinner_dot'>
                </div>
                <div className='spinner_dot'>
                </div>
                <div className='spinner_dot'>
                </div>
            </div>
            
        </div>
    )
}

export default LoadingSpinner;