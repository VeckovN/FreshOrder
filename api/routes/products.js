import express from 'express'
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts, softDeleteProduct, softAddProduct, getProductsByCategory } from '../controllers/productsController.js';
import {verifyAdmin, verifyUser} from '../utility/verifyToken.js';

const router = express.Router();

//RRRR router.post('/',verifyAdmin ,createProduct); //controller insted func implementation as parameter of router
router.post('/' ,createProduct); //controller insted func implementation as parameter of router
//Update --- api/products/:id
// router.put('/:id',verifyAdmin ,updateProduct);
router.put('/:id', updateProduct);
//delete --- api/products/:id
// router.delete('/:id',verifyAdmin ,deleteProduct);
router.delete('/:id',deleteProduct);
// router.put('/softDelete/:id', verifyAdmin, softDeleteProduct);
router.put('/softDelete/:id', softDeleteProduct);
// router.put('/softAdd/:id', verifyAdmin, softAddProduct);
router.put('/softAdd/:id', softAddProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);
router.get('/category/:name', getProductsByCategory);


export default router


