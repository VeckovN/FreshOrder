

const showCart = () => ({type:"SHOW_CART"});
const closeCart = () =>({type:"CLOSE_CART"});
const showRegister = () => ({type:"SHOW_REGISTER"});
const closeRegister = () => ({type:"CLOSE_REGISTER"});
const showLogin = () => ({type:"SHOW_LOGIN"});
const closeLogin = () => ({type:"CLOSE_LOGIN"});
const showAdminUserUpdate = () => ({type:"SHOW_ADMIN_USER_UPDATE"});
const closeAdminUserUpdate = () => ({type:"CLOSE_ADMIN_USER_UPDATE"});
const showAdminDeliveryUpdate = (deliveryTime) => ({type:"SHOW_ADMIN_ORDER_DELIVERY", payload:deliveryTime});
const closeAdminDeliveryUpdate = () => ({type:"CLOSE_ADMIN_ORDER_DELIVERY"});


export default {
    showCart, 
    closeCart, 
    showRegister, 
    closeRegister, 
    showLogin, 
    closeLogin, 
    showAdminUserUpdate, 
    closeAdminUserUpdate,
    showAdminDeliveryUpdate,
    closeAdminDeliveryUpdate
}