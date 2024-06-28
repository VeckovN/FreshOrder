import { useContext } from 'react'
import cartContext from '../../../store/cart-context'
import authContext from '../../../store/auth-context'
import notificationContext from '../../../store/notification-context.js'
import MealItemInputForm from './MealItemInputForm'

import './MealItem.css'

const MealItem = props =>{
    const ctxCart = useContext(cartContext);
    const ctxAuth = useContext(authContext);
    const {addSuccess} = useContext(notificationContext)

    const isAdmin = ctxAuth.user ? ctxAuth.user.isAdmin : false 

    //here is MailItem info, this is why the addItem is in the cart
    //from <mealItemInputFrom> submitHandler
    const addInCartHandler = amount =>{

        const mealObj= {
            id:props.id,
            name:props.name,
            category:props.category,
            description:props.description,
            price:props.price,
            img_path:props.img_path,
            amount:parseInt(amount) //without this, in context update this value will be string
        }
        
        ctxCart.addItemToCart(mealObj);
        addSuccess(`You added ${mealObj.name} to the Cart`);
    }

    return <div className='mealCard'>
        <img src={require(`../../../assets/products/${props.img_path}`)} alt='mealItems' />
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