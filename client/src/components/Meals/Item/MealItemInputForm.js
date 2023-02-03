import react, {useRef, useState} from 'react'

const MealItemInputForm = props =>{
    
    const valueRef = useRef();

    const submitHandler = event =>{
        event.preventDefault()
    
        const inputValue = valueRef.current.value;

        if(inputValue.trim().length === 0 || inputValue <1 || inputValue >10 )
            return;

        //return the value of the item to which it belongs(MealItem) 
        props.onAddInCart(inputValue);
    }

    return (
        <div className='mealButtonForm'>  
            <form onSubmit={submitHandler}>
                <label>Amount:</label>
                <input
                    type='number'
                    ref={valueRef}
                    min='1'
                    max='10'
                    defaultValue='1'
                />
                <button>AddToCart</button>
            </form>
        </div>
    )
}


export default MealItemInputForm;