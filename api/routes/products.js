import express from 'express'
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts, softDeleteProduct, getProductsByCategory } from '../controllers/productsController.js';
import {verifyAdmin, verifyUser} from '../utility/verifyToken.js';

const router = express.Router();

router.post('/' , verifyAdmin, createProduct);
router.put('/:id', verifyAdmin, updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);
router.put('/softDelete/:id', verifyAdmin, softDeleteProduct);

router.get('/:id', getProduct);
router.get('/', getProducts);
router.get('/category/:name', getProductsByCategory);

export default router


