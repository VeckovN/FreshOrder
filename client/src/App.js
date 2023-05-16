//REACT FOLDER STRUCTURE-----------
//https://www.xenonstack.com/insights/reactjs-project-structure

import {useState, useContext, useEffect, useReducer} from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
// import {
//     showCart, 
//     closeCart, 
//     showRegister, 
//     closeRegister, 
//     showLogin, 
//     closeLogin, 
//     showAdminUserUpdate, 
//     closeAdminUserUpdate,
//     showAdminDeliveryUpdate,
//     closeAdminDeliveryUpdate
// } from './components/UI/Modal/ModalUseReducerActions.js'
import {reducer} from './components/UI/Modal/ModalUseReducer.js'
import {initialState} from './components/UI/Modal/ModalUseReducer.js'

import './components/Layout/Header.css'


import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Card from './components/UI/Card'

import Welcome from './components/Page/Welcome'
import AboutUs from './components/Page/AboutUs';
import CategoryMeals from './components/Meals/Category/CategoryMeals';
import AvailableMeals from './components/Meals/AvailableMeals';

import CategoryProvider from './components/Store/CategoryProvider';

import Cart from './components/Cart/Cart.js';
import CartProvider from './components/Store/CartProvider';

import ProtectedRoute from './utils/ProtectedRoute.js';

import Home from './components/Page/Home'
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import NotFound from './components/Page/NotFound.js';
import Profile from './components/Page/Profile/Profile.js';
import Orders from './components/Page/Orders/Orders.js';

import Notification from './components/UI/Notification.js'
import notificationContext from './components/Store/notification-context.js'
import authContext from './components/Store/auth-context';

import AdminHome from './components/Admin/components/page/AdminHome';
import Users from './components/Admin/components/page/Users/Users.js'
import AdminModalUsersUpdate  from './components/Admin/components/page/Users/UsersModal.js';
import AdminDeliveryModal  from './components/Admin/components/page/Orders/AdminDeliveryModal.js'
import Products from './components/Admin/components/page/Products/Products.js'
import AddProducts from './components/Admin/components/page/Products/AddProduct';
import UsersUpdate from './components/Admin/components/page/Users/UsersUpdate.js'



function App() {
  const {error, success, addError, removeError, addSuccess, removeSuccess} = useContext(notificationContext);
  const ctxAuth = useContext(authContext);
  const [state,dispatch] = useReducer(reducer, initialState)

  const showCart = () => dispatch({type:"SHOW_CART"});
  // const showCart = () => {
  //   dispatch({type:"SHOW_CART"});
  // }
  const closeCart = () => dispatch({type:"CLOSE_CART"});
  const showRegister = () => dispatch({type:"SHOW_REGISTER"});
  const closeRegister = () => dispatch({type:"CLOSE_REGISTER"});
  const showLogin = () => dispatch({type:"SHOW_LOGIN"});
  const closeLogin = () => dispatch({type:"CLOSE_LOGIN"});
  const showAdminUserUpdate = () => dispatch({type:"SHOW_ADMIN_USER_UPDATE"});
  const closeAdminUserUpdate = () => dispatch({type:"CLOSE_ADMIN_USER_UPDATE"});
  const showAdminDeliveryUpdate = (deliveryTime) => dispatch({type:"SHOW_ADMIN_ORDER_DELIVERY", payload:deliveryTime});
  const closeAdminDeliveryUpdate = () => dispatch({type:"CLOSE_ADMIN_ORDER_DELIVERY"});


  //This take delivertInfo from children component(forwarding)
  const onShowAdminOrderDelivery = (deliveryInfo)=>{
    showAdminDeliveryUpdate(deliveryInfo)
  }
  // const onCloseAdminOrderDelivery = ()=>{
  //   setDeliveryTimeInfo(null)
  //   setShowAdminModalDeliveryTime(false);
  // }

  const isAdmin = ctxAuth.user ? ctxAuth.user.isAdmin : false;
  return (
      <CartProvider>

        {/* IT's not mather where is this modal(becase modal will be centered on center of screen) */}
        {state.showModalCart && 
          <Cart onClose={closeCart}/>}
        {/* REGISTER MODAL */}
        {state.showModalRegister && 
          <Register onClose={closeRegister} showLogin={showLogin}/>}
        {state.showModalLogin && 
          <Login onClose={closeLogin}/>}
        {/* Admin Users Update Modal */}
        {state.showModalAdminUpdateUser && 
          <AdminModalUsersUpdate onClose={closeAdminUserUpdate}/>}
        {state.deliveryTimeInfo!=null && 
          <AdminDeliveryModal deliveryObj={state.deliveryTimeInfo} onClose={closeAdminDeliveryUpdate}/>}

        {(success || error) && 
          <Notification />}
        <Header 
          onShowCartModal={showCart}
          onShowRegisterModal={showRegister}
          onShowLoginModal={showLogin}
        />

        {/*  THIS INS'T OPTIMIZED, ON EVERY user CHange 
        ROUTES WILL BE RECREATED AND ALL CHILDREN COMPONENT WILL BE ALSO RERENDERED*/}
        {!isAdmin && 
        <Routes>
          {/* HOME PAGE */}
          {/* Not admin */}
          <Route path="/" element={<Home/>}/>
          {/* Admin */}
          {/* <Route path="/" element={<AdminHome/>}/> */}

          {/* Register is a modal not whole page */}
          {/* <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route> */}

          {/* Only authenticated user has access , our created component
          Prevent to unauthenicated user can access to route through url /profile */}        
          <Route
            path='/profile' 
            element= //return Profile if is authenitcated, or return <Navigate to='/'
            {<ProtectedRoute isAdmin={false} navigate='/'> 
              <Profile/> 
            </ProtectedRoute>}
          />
          <Route
            path='/orders'
            element =
            {<ProtectedRoute isAdmin={false} navigate='/'>
              <Orders/>
            </ProtectedRoute>}
          />
          <Route path="*" element ={<NotFound/>}></Route>
        </Routes>
        }

        {/* Admin Route */}
        {/* This <Routes> will only exists when is user Admin, if isn't admin
        he will get NotFound Page when try to go on some routes */}

        {/* THis check we can do in ProtectedRoute and be sure there is loged user and admin user */}
        {ctxAuth.user && ctxAuth.user.isAdmin && 
        <Routes>
          {/* <Route path="/" element={<AdminHome onUserEditUpdate={onShowAdminUsersUpdate} onOrderDeliveryTime={onShowAdminOrderDelivery}/>}/> */}
          <Route path="/" element={<AdminHome onUserEditUpdate={showAdminUserUpdate} onOrderDeliveryTime={onShowAdminOrderDelivery}/>}/>
    
          <Route path='/users'>
            <Route
              index
              element ={
                <ProtectedRoute isAdmin={true} navigate='/'>
                  {/* <Admin/> */}
                  <Users/>
                </ProtectedRoute>
              }
            />
            <Route
              // path='/usersUpdate'
              path='update' // without / because is nested
              element ={
                <ProtectedRoute isAdmin={true} navigate='/'>
                  <UsersUpdate/>
                </ProtectedRoute>
              }
            />
          </Route>

          {/* <Route
          path='/usersUpdate'
          element ={
            <ProtectedRoute isAdmin={true} navigate='/'>
              <UsersUpdate/>
            </ProtectedRoute>
          }
          /> */}

          <Route path='/products' >
              <Route 
                index 
                element ={
                  <ProtectedRoute isAdmin={true} navigate='/'>
                    <Products/>
                  </ProtectedRoute>
                }
              />
              {/* nested route -> /products/add */}
              <Route
                path='add'
                element ={
                  <ProtectedRoute isAdmin={true} navigate='/'>
                    <AddProducts/>
                  </ProtectedRoute>
                }
              />
          </Route>

          <Route path="*" element ={<NotFound/>}></Route> 
        </Routes>
        }

        <Footer/>
      </CartProvider>
  )
}

export default App;