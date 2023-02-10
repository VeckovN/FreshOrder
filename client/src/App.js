//REACT FOLDER STRUCTURE-----------
//https://www.xenonstack.com/insights/reactjs-project-structure

import {useState, useContext, useEffect} from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

import logo from './logo.svg';
// import './App.css';
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

  const [showModalCart, setShowModalCart] = useState(false);
  const [showModalRegistar, setShowModalRegistar] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalAdminUpdateUser, setShowModalAdminUpdateUser] = useState(false);

  const [showAdminModalDeliveryTime, setShowAdminModalDeliveryTime] = useState(false);
  const [deliveryTimeInfo, setDeliveryTimeInfo] = useState(null);


  const {error, success, addError, removeError, addSuccess, removeSuccess} = useContext(notificationContext);
  const ctxAuth = useContext(authContext);


  const onShowCart = () =>{
    setShowModalCart(true);

    console.log("SUCESS: " + success);

    setShowModalRegistar(false);
    setShowModalLogin(false);
  }
  const onCloseCart = () =>{
    setShowModalCart(false);
  }

  const onShowRegister = ()=>{
    setShowModalRegistar(true);

    //Unshown Other Modals
    setShowModalCart(false);
    setShowModalLogin(false);
  }
  const onCloseRegister = ()=>{
    setShowModalRegistar(false);
  }

  const onShowLogin =() =>{
    setShowModalLogin(true);
    setShowModalCart(false);
    setShowModalRegistar(false);
  }
  const onCloseLogin = ()=>{
    setShowModalLogin(false);
  }

  // ADmin
  const onShowAdminUsersUpdate= ()=>{
    setShowModalAdminUpdateUser(true);
  }
  const onCloseAdminUsersUpdate = () =>{
    setShowModalAdminUpdateUser(false);
  }

  const onShowAdminOrderDelivery = (deliveryInfo)=>{
    // alert("DLEIVERYT INFO :" + JSON.stringify(deliveryInfo))
    setDeliveryTimeInfo(deliveryInfo);
    //take OrderID in state instead showModalDelivery state
    setShowAdminModalDeliveryTime(true);
  }
  const onCloseAdminOrderDelivery = ()=>{
    setDeliveryTimeInfo(null)
    setShowAdminModalDeliveryTime(false);
  }

  const isAdmin = ctxAuth.user ? ctxAuth.user.isAdmin : false;
  return (
      <CartProvider>

        {/* IT's not mather where is this modal(becase modal will be centered on center of screen) */}
        {showModalCart && <Cart onClose={onCloseCart}/>}; 
        {/* //onHideCart handler for closing modal */}

        {/* REGISTER MODAL */}
        {/* If is clicked on register link */}
        {showModalRegistar && <Register onClose={onCloseRegister} showLogin={onShowLogin}/>}
        {showModalLogin && <Login onClose={onCloseLogin}/>}

        {/* Admin Users Update Modal */}
        {showModalAdminUpdateUser && <AdminModalUsersUpdate onClose={onCloseAdminUsersUpdate}/>}
        {/* Admin delivery time picker */}
        {/* {showAdminModalDeliveryTime && } */}
        {deliveryTimeInfo!=null && <AdminDeliveryModal deliveryObj={deliveryTimeInfo} onClose={onCloseAdminOrderDelivery}/>}


        {/* {error || success && <Notification/>} */}
        {(success || error) && <Notification />}

        <Header 
          onShowCartModal={onShowCart}
          onShowRegisterModal={onShowRegister}
          onShowLoginModal={onShowLogin}
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
        {ctxAuth.user && ctxAuth.user.isAdmin && 
        <Routes>
          <Route path="/" element={<AdminHome onUserEditUpdate={onShowAdminUsersUpdate} onOrderDeliveryTime={onShowAdminOrderDelivery}/>}/>
          
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
            path='/users'
            element ={
              <ProtectedRoute isAdmin={true} navigate='/'>
                <Users/>
              </ProtectedRoute>
            }
          /> */}

          <Route
          path='/usersUpdate'
          element ={
            <ProtectedRoute isAdmin={true} navigate='/'>
              <UsersUpdate/>
            </ProtectedRoute>
          }
          />

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

            {/* <Route
              path='/products'
              element ={
                <ProtectedRoute isAdmin={true} navigate='/'>
                  <Products/>
                </ProtectedRoute>
              }
            /> */}

          <Route path="*" element ={<NotFound/>}></Route> 
        </Routes>
        }

        <Footer/>
      </CartProvider>
  );
}

export default App;