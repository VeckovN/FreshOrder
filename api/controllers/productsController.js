import Product from '../models/Product.js'

export const createProduct = async (req,res) =>{
    const newProduct = new Product(req.body);
    const image = newProduct.image;

    try {
        //save() is async and this is a reason why is await used --- THIS ISN'T PROMISE 
        //https://mongoosejs.com/docs/promises.html
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct);
        
    }
    catch(err){
        // res.status(500).json(err);
        next(err);
    }
}

export const updateProduct  = async (req,res,next)=>{
    try{
        const id = req.params.id; //from url
        const newContext = req.body; //from html-req body
        const updatedProduct = await Product.findByIdAndUpdate(id, newContext, {new:true});
        //without {new:true} prop - this findByIdAndUpdate returns prev(notUpdated) Product   
        res.status(200).json(updatedProduct);
    }
    catch(err){
        next(err);
    }
}

export const deleteProduct = async (req,res,next)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).send("Product has been deleted");
    }
    catch(err){
        next(err);
    }
}

export const softDeleteProduct = async(req,res,next)=>{
    try{    
        const id = req.params.id;
        const updatedProduct = await Product.findOneAndUpdate({_id: id},[{$set:{isDeleted:{$eq:[false,"$isDeleted"]}}}]);
        res.status(200).send("Product: "+ updatedProduct.name + " is soft deleted");
    }
    catch(err){
        next(err);
    }
} 

export const getProduct = async (req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        next(err);
    }
}

export const getProducts = async (req,res,next)=>{
    try{
        const products = await Product.find(); //find all
        res.status(200).json(products);
    }
    catch(err){
        next(err); 
    }
}

export const getProductsByCategory = async (req, res, next)=>{
    try{
        const category = req.params.name;
        const products = await Product.find({category:category});
        res.send(products);
        
    }catch(err){
        res.next(err);
    }
}

