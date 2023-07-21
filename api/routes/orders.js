import express from 'express'
const router = express.Router();
import {createOrder, completeOrder, getOrder, getOrders, getAllUserOrders, deleteOrder, getOrdersCount }from '../controllers/orderController.js'
import { verifyAdmin, verifyUser } from '../utility/verifyToken.js';


router.post('/', verifyUser,createOrder);
router.put('/complete/:id', verifyUser, completeOrder);
router.get('/count', getOrdersCount)
router.get('/:id', verifyUser, getOrder);
router.get('/', verifyAdmin, getOrders);
router.get('/userOrders/:userID',verifyUser, getAllUserOrders);
router.delete('/:idOrder/:idClient',  verifyUser, deleteOrder);


export default router


