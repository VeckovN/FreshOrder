import react, { useContext } from 'react'
import cartContext from '../../Store/cart-context'
import authContext from '../../Store/auth-context'

import './MealItem.css'

import MealItemInputForm from './MealItemInputForm'
import notificationContext from '../../Store/notification-context.js'


//import picture
const MealItem = props =>{

    //import picture

    const ctxCart = useContext(cartContext);
    const ctxAuth = useContext(authContext);
    const {addSuccess} = useContext(notificationContext)

    //if user authenticated and if is he admin
    const isAdmin = ctxAuth.user ? ctxAuth.user.isAdmin : false 

    //here is MailItem info, this is reason why we here addItem into cart
    //from <mealItemInputFrom> submitHandler
    const addInCartHandler = amount =>{

        const mealObj= {
            id:props.id,
            name:props.name,
            category:props.category,
            description:props.description,
            price:props.price,
            // img_name:props.img_name,
            img_path:props.img_path,
            amount:parseInt(amount) //without this, in context update this value will be string
        }
        
        ctxCart.addItemToCart(mealObj);
        addSuccess(`You added ${mealObj.name} to the Cart`);
    }

    let imgSource ='';

    // RRR if(props.img_path !== ''){
    //     imgSource= require('../../../assets/Items/' + props.img_path +'.jpg');
    // }

    return <div className='mealCard'>
        <img src= {'./products/' + props.img_path} alt='mealItems'></img>     
        <div className='mealInfo'>
            <h3>{props.name}</h3>
            <div className='description'>{props.description}</div>
            <div className='price'>{props.price}$</div>
        </div>
            {!isAdmin &&
            <MealItemInputForm onAddInCart={addInCartHandler}/>
            }
    </div>
}

export default MealItem;