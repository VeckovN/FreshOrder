import { useReducer, useState} from "react";

import ModalContext from "./modal-context";

const InitialModalState ={
    showModal: false,
    typeModal: '',
    deliveryTimeInfo: null,
    productDeleteInfo: null,
    userInfo:null
}

const ReducerModal = (state, action) =>{
    
    switch(action.type){
        case "SHOW_CART":
            return {showModal:true, typeModal:"Cart"}
        case "SHOW_REGISTER":
            return {showModal:true, typeModal:"Register"}
        case "SHOW_LOGIN":
            return {showModal:true, typeModal:"Login"}
        case "SHOW_ADMIN_USER_UPDATE":
            return {showModal:true, typeModal:"AdminUpdate", userInfo: action.payload}
        // case "SHOW_ADMIN_ORDER_DELIVERY":
        //     return {showModal:true, typeModal:"AdminOrderDelivery"}
        case "SHOW_ADMIN_ORDER_DELIVERY":
            return {showModal:true, typeModal:"AdminOrderDelivery", deliveryTimeInfo: action.payload}
        case "SHOW_ADMIN_PRODUCT_DELETE":
            return {showModal:true, typeModal:"AdminProductDelete", productDeleteInfo: action.payload}
        case "CLOSE_MODAL":
            return {showModal:false, typeModal:""}
        default:
            return state;
    }
}


const ModalProvider = props =>{
    const [userState, dispatchAction] = useReducer(ReducerModal, InitialModalState);

    const closeModal = () =>{
        dispatchAction({type:"CLOSE_MODAL"});
    }
    const showCart = () =>{
        dispatchAction({type:"SHOW_CART"});
    }
    const showRegister = () =>{
        dispatchAction({type:"SHOW_REGISTER"});
    }
    const showLogin = () =>{
        dispatchAction({type:"SHOW_LOGIN"});
    }
    const showAdminUpdate = (data) =>{
        dispatchAction({type:"SHOW_ADMIN_USER_UPDATE", payload:data});
    }
    const showAdminOrderDelivery = (data) =>{
        dispatchAction({type:"SHOW_ADMIN_ORDER_DELIVERY", payload:data});
    }
    const showAdminProductDelete = (data) =>{
        console.log("ADM(IIIIN NN PRPDOSOADOSAD DATAAA " , data);
        dispatchAction({type:"SHOW_ADMIN_PRODUCT_DELETE", payload:data});
    }

    //This avialiable in other components with {showMOdal, modalType ...} = useContext(This context)
    const modalContext = {
        showModal: userState.showModal,
        typeModal: userState.typeModal,
        deliveryTimeInfo: userState.deliveryTimeInfo,
        productDeleteInfo: userState.productDeleteInfo,
        userInfo: userState.userInfo,
        dispatchAction,
        closeModal:closeModal,
        showCart:showCart,
        showRegister,
        showLogin,
        showAdminUpdate,
        showAdminOrderDelivery,
        showAdminProductDelete,
    }

    return(
        <ModalContext.Provider value={modalContext}>
            {props.children}
        </ModalContext.Provider>
    )
}


export default ModalProvider;