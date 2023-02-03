import Product from '../models/Product.js'

export const createProduct = async (req,res) =>{
    //we expect Object with Products props from Frontend(REACT)-form
    const newProduct = new Product(req.body);

    const image = newProduct.image;
    //take image and get ImageName
    


    try {
        //save() is async and this is reason why we use await --- THIS ISN'T PROMISE 
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
    //id from url
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
        //if everything is fine
        //res.status(200).json({message:"Product deleted"});
        res.status(200).send("Product has been deleted");
    }
    catch(err){
        next(err);
    }
}

export const softDeleteProduct = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(id, {isDeleted:true}, {new:true});
        
        res.status(200).send("Product: "+ updatedProduct.name + " is soft deleted");
    //res.status(200).json(updatedProduct);
    }
    catch(err){
        next(err);
    }  
}

export const softAddProduct = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(id, {isDeleted:false}, {new:true});
        
        res.status(200).send("Product: "+ updatedProduct.name + " is soft added(returned)");
        //res.status(200).json(updatedProduct);
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
        next(err); // calling next error handling middleware
        //instead 
        // res.status(500).json(err);
    }
}

export const getProductsByCategory = async (req, res, next)=>{
    try{
        const category = req.params.name;
        // const prodcuts  
        // res.send("Category: " + category);
        const products = await Product.find({category:category});
        res.send(products);
        
    }catch(err){
        res.next(err);
    }
}

