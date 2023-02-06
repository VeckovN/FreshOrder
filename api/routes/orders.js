import express from 'express'
const router = express.Router();
import {createOrder, completeOrder, getOrder, getOrders, getAllUserOrders, deleteOrder, getOrdersCount }from '../controllers/orderController.js'
import { verifyAdmin, verifyUser } from '../utility/verifyToken.js';

//Create -> when user order products
//RRR router.post('/', verifyUser,createOrder);
router.post('/', createOrder);
//Complete Order
// router.put('/complete/:id', verifyAdmin, completeOrder);
router.put('/complete/:id', completeOrder);

router.get('/count', getOrdersCount)

//GetOne
router.get('/:id', verifyUser, getOrder);
//GetAll\

//RRRRR router.get('/', verifyAdmin, getOrders);
router.get('/',  getOrders);
// router.post('/orders', )

//RRRRR router.get('/userOrders/:userID', verifyUser, getAllUserOrders);
router.get('/userOrders/:userID', getAllUserOrders);

// router.delete('/:id', verifyAdmin, deleteOrder);
router.delete('/:idOrder/:idClient',  deleteOrder);


export default router


