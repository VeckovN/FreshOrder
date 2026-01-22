import express from 'express'
const router = express.Router();
import {createOrder, completeOrder, getOrder, getOrders, getAllUserOrders, deleteOrder, getOrdersCount }from '../controllers/orderController.js'
import { verifyAdmin, verifyUser } from '../utility/verifyToken.js';
import { apiReadLimiter, apiWriteLimiter } from '../utility/rateLimiter.js';

router.post('/', apiWriteLimiter, verifyUser, createOrder);
router.put('/complete/:id', apiWriteLimiter, verifyUser, completeOrder);
router.get('/count', apiReadLimiter, getOrdersCount)
router.get('/:id', apiReadLimiter, verifyUser, getOrder);
router.get('/', apiReadLimiter, verifyAdmin, getOrders);
router.get('/userOrders/:userID', apiReadLimiter, verifyUser, getAllUserOrders);
router.delete('/:idOrder/:idClient',apiWriteLimiter, verifyUser, deleteOrder);

export default router


