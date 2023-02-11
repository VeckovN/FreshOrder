import express from 'express'
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts, softDeleteProduct, softAddProduct, getProductsByCategory } from '../controllers/productsController.js';
import {verifyAdmin, verifyUser} from '../utility/verifyToken.js';

const router = express.Router();

//create --- api/products/:id
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

// / router.post('/', async (req,res) =>{
//     const newProduct = new Product(req.body);

//          try {
//              //save() is async and this is reason why we use await --- THIS ISN'T PROMISE 
//              //https://mongoosejs.com/docs/promises.html
//              const saveProduct = await newProduct.save();
//              res.status(200).json(saveProduct);
//          }
//          catch(err){
//              res.status(500).json(err);
//          }
//    })


export default router


