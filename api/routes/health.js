import express from 'express'
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (_req, res) =>{
    try{    
       const product = await Product.findOne(); // lightweight query
        res.status(200).json({
            status: "OK",
            db: !!product ? "connected" : "no products found",
            timestamp: new Date(),
        });
    }
    catch(error){
        res.status(500).json({ status: "ERROR", message: error.message });
    }
})

export default router


