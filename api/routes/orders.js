import express from 'express'
const router = express.Router();
import {createOrder, completeOrder, getOrder, getOrders, getAllUserOrders, deleteOrder, getOrdersCount }from '../controllers/orderController.js'
import { verifyAdmin, verifyUser, verUser, verAdmin } from '../utility/verifyToken.js';

//RRR router.post('/', verifyUser,createOrder);
// router.post('/', createOrder);
router.post('/', verUser,createOrder);
//Complete Order
// router.put('/complete/:id', verifyAdmin, completeOrder);
// router.put('/complete/:id', completeOrder);
router.put('/complete/:id', verUser, completeOrder);
router.get('/count', getOrdersCount)

//GetOne
// router.get('/:id', verifyUser, getOrder);
router.get('/:id', verUser, getOrder);
//GetAll\
//RRRRR router.get('/', verifyAdmin, getOrders);
// router.get('/',  getOrders);
router.get('/', verAdmin, getOrders);

// router.post('/orders', )
//RRRRR router.get('/userOrders/:userID', verifyUser, getAllUserOrders);
// router.get('/userOrders/:userID', getAllUserOrders);
router.get('/userOrders/:userID',verUser, getAllUserOrders);


// router.delete('/:id', verifyAdmin, deleteOrder);
// router.delete('/:idOrder/:idClient',  deleteOrder);
router.delete('/:idOrder/:idClient',  verUser, deleteOrder);


export default router


