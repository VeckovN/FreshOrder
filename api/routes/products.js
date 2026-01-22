import express from 'express'
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts, softDeleteProduct, getProductsByCategory } from '../controllers/productsController.js';
import {verifyAdmin, verifyUser} from '../utility/verifyToken.js';
import { apiReadLimiter, apiWriteLimiter } from '../utility/rateLimiter.js';

const router = express.Router();

router.post('/' , apiWriteLimiter, verifyAdmin, createProduct);
router.put('/:id', apiWriteLimiter, verifyAdmin, updateProduct);
router.delete('/:id', apiWriteLimiter, verifyAdmin, deleteProduct);
router.put('/softDelete/:id', apiWriteLimiter, verifyAdmin, softDeleteProduct);

router.get('/:id', apiReadLimiter, getProduct);
router.get('/', apiReadLimiter, getProducts);
router.get('/category/:name', apiReadLimiter, getProductsByCategory);

export default router


