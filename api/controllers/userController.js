import User from '../models/User.js'
import { createError } from '../utility/error.js';
import bcrypt from 'bcryptjs';

export const updateUser = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const newContext = req.body;

        const existingUser =  await User.findById(id);
        const loggedUser = await User.findById(req.user.id);

        //Watch on demo account (user)
        if(existingUser.email === 'veckov@gmail.com')
            return next(createError(404, "Demo account cannot update profile data"))

        // //if the logged user(demo admin) try to delete user
        if(loggedUser.email === 'admin@gmail.com')
            return next(createError(404, "Demo Admin account cannot update profile data"))

        if(newContext.username){
            const user = await User.findOne({username: newContext.username})
            if(user)
                return next(createError(404, "Username exists"))
        }

        if(newContext.email){
            const user = await User.findOne({email: newContext.email})
            if(user){
                return next(createError(404, 'Email exists'));
            }
        }
        
        if(newContext.password){
            if(newContext.repeat_password){

                if(newContext.password !== newContext.repeat_password)
                    return next(createError(404, `Passwords aren't same`))

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newContext.password, salt);
                newContext.password = hash;
            }
            
        }

        const updatedUser = await User.findByIdAndUpdate(id, newContext, {new:true});
        //without {new:true} prop - this findByIdAndUpdate returns prev(notUpdated) Product
        const {_id, isAdmin, password, orders, createdAt, updatedAt, ...others} = updatedUser._doc;

        res.status(200).json(others);
    }
    catch(err){
        next(err);
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return next(createError(404, "User not found"));
        }

        const loggedUserID = req.user.id;
        const loggedUser = await User.findById(loggedUserID);
        //don't allow demo account to delete user 
        if(loggedUser.email === 'admin@gmail.com'){
            return next(createError(403, "Demo Admin account cannot delete users"));
        }
            
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
        User.findById(user, (err, order)=>{
            console.log("FOUND USER WIHT ID: " + user.id);
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
        const user = await User.findOne( 
            {_id: req.params.id},
            {orders:0} //orders field is excluded from the result
        );
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}

export const getUsers = async (req,res,next)=>{
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const startIndex = (page - 1) * limit;
    
        await User.find({isAdmin:false})
        .skip(startIndex) //page 1 -> from 0 is going to index 5(not 5)(limit) , page 2 ->5
        .limit(limit)
        .exec((err,doc)=>{
            if(err) {res.status(500).json(err); return;}
            res.status(200).json(doc);
        })
    }
    catch(err){
        next(err); // calling next error handling middleware
        //instead  res.status(500).json(err);
    }
}

export const getUserCount = (req,res) =>{
    User.count({isAdmin:false}, function(err, result){
        if(err){
            res.status(400).send(err);
        }
        else
            res.json({count:result})  
    })
}