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
        //if page doesn't exist then by default is 1
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;

        // //index 0 is start index -> we got index 1 from frond as start index
        // const startIndex = (page - 1) * limit; 
        // const endIndex = page * limit ; //-1 isn't needed, endIndex is used in .slice as second parameter and this value ins't counted
        // //--- e.g on page 1 with 5 limit we got 1-1 * 5 => 0 
        // //we got 0,1,2,3,4 -> 5 items 
        // //endindex is 5-1 -> page * limit(5) - 1 

        // //e.g on page 2 with 5 limit we got (2-1)= 1 * 5 => 5 StartIndex
        // // we'll show index 5,6,7,8,9
        // //----EndIndex is 10-1 -> page *limit (10) - 1

        const startIndex = (page - 1) * limit;
        //SKIP PROPS SHOULD BE startIndex
        
        console.log("PAGE :" +page + " LIMIT: " + limit);
        // const users = await User.find(); //find all
        // const users = await User.find({isAdmin:false})
        await User.find({isAdmin:false})
        .skip(startIndex) //page 1 -> from 0 is going to index 5(not 5)(limit) , page 2 ->5
        .limit(limit)
        .exec((err,doc)=>{
            if(err) {res.status(500).json(err); return;}
            res.status(200).json(doc);
        })
        // res.status(200).json(users);
    }
    catch(err){
        next(err); // calling next error handling middleware
        //instead 
        // res.status(500).json(err);
    }
}

export const getUserCount = (req,res) =>{
   
    User.count({isAdmin:false}, function(err, result){
        if(err){
            res.status(400).send(err);
            console.log("ERRR: " + err)
        }
        else
            res.json({count:result})
        
    })
}


// //THIS DELETED USER (DELETE USER WHEN IS ORDER : orderId)
        // const userOrder = await User.findOneAndRemove({$pull: { 'orders': orderId}})