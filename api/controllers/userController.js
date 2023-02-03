import User from '../models/User.js'
import Order from '../models/Order.js'

//Register function exists 


export const updateUser  = async (req,res,next)=>{
    //id from url
    try{
        const id = req.params.id; //from url
        const newContext = req.body; //from html-req body

        console.log("UPDATEEEEEE : " + JSON.stringify(newContext));

        const updatedUser = await User.findByIdAndUpdate(id, newContext, {new:true});
        //without {new:true} prop - this findByIdAndUpdate returns prev(notUpdated) Product
        
        const {_id, isAdmin, password, orders, createdAt, updatedAt, ...others} = updatedUser._doc;

        console.log("UPDATED " + JSON.stringify(updatedUser._doc))

        res.status(200).json(others);
    }
    catch(err){
        next(err);
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        const userID = await User.findById(req.params.id);

        //!!!CASSCADE DELETE WITHOUT MIDDLEWARE!!!!
        // //DELETE ALL ORDERS From User WHERE IS orders:IDS 
        // const ordersIDs = userID.orders;
        // const orders = await Order.deleteMany({
        //     _id:{
        //         $in:ordersIDs //array of ids
        //     }
        // })
        //await user.delete();

        //ANOTHER WAY FOR CASSCADE DELETE

        //!!!!WHEN WE FOUND UserBYId WE CALLED THIS MIDDLEWARE order !!!!
        //(this middleware will delete all user orders)
        User.findById(userID, (err, order)=>{
            console.log("FOUND USER WIHT ID: " + userID);
            //when we found user call callback, -second argument(order) for calling middleware
            if(err) return next(err);
            //call middleware from User Model
            order.remove(); 
        })
        res.status(200).send('User has been deleted');
    }
    catch(err){
        next(err);
    }
}


export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}

export const getUsers = async (req,res,next)=>{
    try{
        // const users = await User.find(); //find all
        const users = await User.find({isAdmin:false}); //find all non Admin users
        res.status(200).json(users);
    }
    catch(err){
        next(err); // calling next error handling middleware
        //instead 
        // res.status(500).json(err);
    }
}


// //THIS DELETED USER (DELETE USER WHEN IS ORDER : orderId)
        // const userOrder = await User.findOneAndRemove({$pull: { 'orders': orderId}})