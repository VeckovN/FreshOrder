import {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';

import Header from './components/Layout/Header.js'
import Footer from './components/Layout/Footer'

import Cart from './components/Cart/Cart.js';
import CartProvider from './store/CartProvider.js';

import ProtectedRoute from './utils/ProtectedRoute.js';
import ScrollToTop from './utils/ScrollToTop.js';

import Home from './pages/Home.js';
import NotFound from './pages/NotFound.js';
import Profile from './pages/Profile/Profile.js';
import Orders from './pages/Orders/Orders.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';

import Notification from './components/UI/Notification.js';
import notificationContext from './store/notification-context';
import authContext from './store/auth-context';
import modalContext from './store/modal-context.js';

import AdminHome from './admin/page/AdminHome';
import Users from './admin/page/Users/Users.js';
import AdminModalUsersUpdate  from './admin/components/Users/UsersUpdateModal.js';
import AdminDeliveryModal  from './admin/page/Orders/AdminDeliveryModal.js'
import Products from './admin/page/Products/Products.js'
import AddProducts from './admin/components/AddProduct/AddProduct.js';
import ProductDelete from './admin/components/Products/ProductDelete.js';

import {useAxiosJWTInterceptors} from './services/axiosJWTInstance.js';

function App() {
  const {error, success} = useContext(notificationContext);
  const ctxAuth = useContext(authContext);
  const ctxModal = useContext(modalContext);

  //calling here ensure that interceptors will be configured before any request
  useAxiosJWTInterceptors();

  const isAdmin = ctxAuth.user ? ctxAuth.user.isAdmin : false;
  return (
    <CartProvider>
      <ScrollToTop/>

      {ctxModal.showModal && (
        <>
          {ctxModal.typeModal === "Cart" && <Cart />}
          {ctxModal.typeModal === "Register" && <Register />}
          {ctxModal.typeModal === "Login" && <Login />}
          {ctxModal.typeModal === "AdminUpdate" && <AdminModalUsersUpdate />}
          {ctxModal.typeModal === "AdminOrderDelivery" && <AdminDeliveryModal />}
          {ctxModal.typeModal === "AdminProductDelete" && <ProductDelete />}
        </>
      )}

      {/* Show list of notification not only one notification */}
      {(success || error) && 
        <Notification />}

      <Header/> 

      <Routes>
        {!isAdmin && (
          <>
            {/* HOME PAGE(NotAdmin) */}
            <Route path="/" element={<Home/>}/>
            <Route 
              path='/profile' 
              element={//return Profile if is authenitcated, or return <Navigate to='/'
                <ProtectedRoute isAdmin={false} navigate='/'> 
                  <Profile/> 
                </ProtectedRoute>
              }
            />
            <Route
              path='/orders'
              element = {
                <ProtectedRoute isAdmin={false} navigate='/'>
                  <Orders/>
                </ProtectedRoute>
              }
            />
            <Route path="*" element ={<NotFound/>}></Route>
        </>
      )}

      {/* Admin Route */}
      {/* This <Routes> will only exists when is user Admin, if isn't admin
      he will get NotFound Page when try to go on some routes */}
      {/* THis check we can do in ProtectedRoute and be sure there is loged user and admin user */}
      {/* {ctxAuth.user && ctxAuth.user.isAdmin && ( */}
      {isAdmin && (
        <>
          <Route 
            path="/" 
            element={
              <AdminHome/>
            }
          />
    
          <Route path='/users'>
            <Route
              index
              element ={
                <ProtectedRoute isAdmin={true} navigate='/'>
                  <Users/>
                </ProtectedRoute>
              }
            />
          </Route>

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
        </>
      )}
      </Routes>

      <Footer isAdmin={isAdmin}/>
    </CartProvider>
  )
}

export default App;