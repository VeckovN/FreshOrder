const initialState ={
    showModalCart:false,
    showModalRegister:false,
    showModalLogin:false,
    showModalAdminUserUpdate:false,
    showModalAdminOrderDelivery:false,
    deliveryTimeInfo:null
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        //register,login and cart Modal could be clicked at the same page
        //and this is a  way to ensure that only one model is displayed
        case "SHOW_CART":
            return {...state, showModalCart:true, showModalRegister:false, showModalLogin:false}; 
        case "SHOW_REGISTER":
            return {...state, showModalRegister:true, showModalCart:false, showModalLogin:false};
        case "SHOW_LOGIN":
            return {...state, showModalLogin:true, showModalRegister:false, showModalCart:false};
        case "SHOW_ADMIN_USER_UPDATE":
            return {...state, showModalAdminUserUpdate:true};
        case "SHOW_ADMIN_ORDER_DELIVERY":
            return {...state, showModalAdminOrderDelivery:true, deliveryTimeInfo: action.payload}; //set object in from action payload
        case "CLOSE_CART":
            return {...state, showModalCart:false};
        case "CLOSE_REGISTER":
            return {...state, showModalRegister:false};
        case "CLOSE_LOGIN":
            return {...state, showModalLogin:false};
        case "CLOSE_ADMIN_USER_UPDATE":
            return {...state, showModalAdminUserUpdate:false};
        case "CLOSE_ADMIN_ORDER_DELIVERY":
            return {...state, showModalAdminOrderDelivery:false, deliveryTimeInfo:null};
        default:
            return state;
            
    }
}

//not export default
export {reducer, initialState};

