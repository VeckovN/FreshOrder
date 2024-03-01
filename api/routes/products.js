import express from 'express'
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts, softDeleteProduct, getProductsByCategory } from '../controllers/productsController.js';
import {verifyAdmin, verifyUser} from '../utility/verifyToken.js';

const router = express.Router();

router.post('/' , verifyAdmin, createProduct); //controller insted func implementation as parameter of router
//Update --- api/products/:id
router.put('/:id', verifyAdmin, updateProduct);
//delete --- api/products/:id
router.delete('/:id', verifyAdmin, deleteProduct);
router.put('/softDelete/:id', verifyAdmin, softDeleteProduct);

router.get('/:id', getProduct);
router.get('/', getProducts);
router.get('/category/:name', getProductsByCategory);


export default router


