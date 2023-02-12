import mongoose from 'mongoose';
import Order from '../models/Order.js'
import User from '../models/User.js';
import {createError} from '../utility/error.js'
// import {sendEmail} from '../utility/email.js';
import {transporter} from '../utility/email.js';

import dotenv from 'dotenv'
dotenv.config();

Order.collection.getIndexes({full: true}).then(indexes => {
    console.log("indexes:", indexes);
    // ...
}).catch(console.error);


//Nested populate in a document --- https://dev.to/paras594/how-to-use-populate-in-mongoose-node-js-mo0


export const createOrder = async (req,res,next) =>{

    const id = req.body.user; //test- id user
    //EXPECTED JSON FROM FRONTEND
    // {
    //     "userID": "635ba836ff04dc580230a964", ->type:mongoose.Types.ObjectId, ref="User"
    //     "products":[
    //         {
    //             "product":"6359734b0abd5b6771c9845e", ->type:mongoose.Types.ObjectId, ref="Product"
    //             "amount":2 -> Type:Number
    //         },
    //         {
    //             "product":"63595879835e201be6fa15eb",
    //             "amount":3
    //         }
    //     ]
    // }
    try{
        //we got from req.body string value, user->ID has to be casted to ObjectId
       
        const user = await User.findById({_id:id});
        if(!user)
            return next(createError(404, 'User not found!!!'));

        console.log("ORDER DATA: " + JSON.stringify(req.body) );

        const newOrder = new Order(req.body);
        const saveOrder = await newOrder.save();
        const orderID = saveOrder._id;
        //user.orders[] is order ID =>ObjectId - ref="Order"
        
        //const user = await User.updateOne({_id:id}, {$push: {orders:orderID}})
        // const user = await User.findById({_id:id});
        // if(!user)
        //     return next(createError(404, 'User not found!!!'));
        
        //After the order is created, add OrderID to user orders 
        user.orders.push(orderID);
        const upatedUser = user.save();

        res.status(200).json(upatedUser);
    }
    catch(err){
        next(err);
    }
}


export const completeOrder = async(req,res,next)=>{

    try{
        //orderID
        const id = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(id, {isCompleted:true}, {new:true})
        const {userEmail, deliveryTime} = req.body

        const textContext = "OrderApp, Expect an order for" + deliveryTime + 'min';
        //EMAIL
        //Obj for sending email {email, text} = sendObj;
        //const sendObj = {email:userEmail, text: textContext};
        //sendEmail(sendObj);

        //HTML can also be sent instead text
        const message = {
            from:process.env.EMAIL_USERNAME,
            to:userEmail,
            subject:'Order from OrderApp',
            text:"Order app, expect an order for " + deliveryTime +'minutes'
        } 
    
        
        // transporter.sendMail(message, (err,info)=>{
        //     if(err){
        //         console.log(err);
        //         //res.status(400).send("Emaill not send");
        //     }
        //     else{
        //         console.log(info);
        //         //res.status(200).send("Email send");
        //     }
        // })
        res.status(200).send("Order completed");

    }catch(err){
        next(err);
    }
}

export const getOrder = async(req,res,next) =>{

    try{
        const id = req.params.id;
        //products is array, product is Model which products array contain it
        const order = await Order.findById(id).populate('products.product');
        if(!order)
            return next(createError(400,"Order doesn't exist!!!"));
        res.status(200).json(order);
    }
    catch(err){
        next(err);
    }
}
//#region Without Populate\
// {
// 	"_id": "635c2b10d2cd7de411fb0824",
// 	"user": "635ba836ff04dc580230a964",
// 	"products": [
// 		{
// 			"product": "6359734b0abd5b6771c9845e",
// 			"amount": 2,
// 			"_id": "635c2b10d2cd7de411fb0825"
// 		},
// 		{
// 			"product": "63595879835e201be6fa15eb",
// 			"amount": 3,
// 			"_id": "635c2b10d2cd7de411fb0826"
// 		}
// 	],
// 	"isCompleted": true,
// 	"createdAt": "2022-10-28T19:18:40.386Z",
// 	"updatedAt": "2022-10-28T19:30:57.737Z",
// 	"__v": 0
// }
//#endregion

//#region With Populate (we got all Product information Based on his ObjectId)
// {
// 	"_id": "635c2b10d2cd7de411fb0824",
// 	"user": "635ba836ff04dc580230a964",
// 	"products": [
// 		{
// 			"product": {
// 				"_id": "6359734b0abd5b6771c9845e",
// 				"name": "Margarita",
// 				"category": "Pizza",
// 				"description": "Only Large Size",
// 				"price": 35,
// 				"img_path": "/",
// 				"isDeleted": false,
// 				"__v": 0
// 			},
// 			"amount": 2,
// 			"_id": "635c2b10d2cd7de411fb0825"
// 		},
// 		{
// 			"product": {
// 				"_id": "63595879835e201be6fa15eb",
// 				"name": "Capricciosa",
// 				"category": "Pizza",
// 				"description": "Big One",
// 				"price": 45,
// 				"img_path": "/",
// 				"isDeleted": false,
// 				"__v": 0
// 			},
// 			"amount": 3,
// 			"_id": "635c2b10d2cd7de411fb0826"
// 		}
// 	],
// 	"isCompleted": true,
// 	"createdAt": "2022-10-28T19:18:40.386Z",
// 	"updatedAt": "2022-10-28T19:30:57.737Z",
// 	"__v": 0
// }
//#endregion

export const getOrders = async(req,res,next)=>{

    const page = req.query.page;
    const limit =req.query.limit;
    const sort = req.query.sort;

    //default
    let sortObj = {createdAt:-1}
    let findOption ={};

    let completedSelect ;

    if(sort =='completed')
    {
        completedSelect +='isCompleted:-1'
        sortObj ={isCompleted:-1, ...sortObj}
        findOption={isCompleted:true}
    }
    if(sort =='notCompleted')
    {
        completedSelect +='isCompleted';
        sortObj ={isCompleted:1, ...sortObj}
        findOption={isCompleted:false}
    }

    console.log("SORTTTT: " + JSON.stringify(sortObj));

    
    //startIndex for selected Page
    const startIndex = (page - 1) * limit;

    //PAGINATION
        // const orders = await Order.find().populate('products.product'); 
        await Order.find(findOption).populate('products.product user')
        .skip(startIndex)
        .limit(limit)
        .sort(sortObj)
        .exec((err,doc)=>{
            if(err) {res.status(500).send(err); return;}
            res.status(200).json(doc);
            
        })
        

}

export const getOrdersCount = (req,res) =>{
    //If There is a sort option(Completed or notCompleted)
    
    const sortStatus = req.query.sort;

    let sortOption = {}
    if(sortStatus == 'completed')
        sortOption = {isCompleted:true}
    else if(sortStatus == 'notCompleted')
        sortOption = {isCompleted:false};

    //index created for isCompleted:false
    Order.count(sortOption, function(err, result){
        if(err){
            res.status(400).send(err);
            console.log("ERRR: " + err)
        }
        else
            res.json({count:result})  
    })
}

export const getAllUserOrders = async(req,res,next)=>{
    try{
        const id = req.params.userID;

        // const allUserOrders = await User.find({_id:id}, 'orders');
        const allUserOrders = await User.
            find({_id:id}, 'orders')
            // .populate('orders')
            .populate({
                path:'orders', //populate orders
                populate:{
                    path: 'products.product',
                    
                }
            })
        if(!allUserOrders)
            return next(createError(400, "User not found!"));
        res.status(200).json(allUserOrders)
    }
    catch(err){
        next(err);
    }
}

export const deleteOrder = async(req,res,next)=>{

    //our client ID
    const clientId = req.params.idClient;
    const orderId = req.params.idOrder;

    console.log("OrderID: " + orderId + "ClientID: " + clientId);

    try{

        //Casscade deleting Without Mongoose (Pre) Middleware
        //Only One use can contains same order
        await User.updateOne({_id:clientId},{ //{}-notByID-any User that contains orders:orderID
            $pull: {
                'orders':orderId
            }
        })
        //Find Order to delete
        await Order.findByIdAndDelete(orderId);
        res.status(200).send("You sucessfully deleted order"); 

        // //Casscade Delete With Middleware
        // await Order.findById(orderId, (err,order)=>{
            
        //     if(err) return next(err); //this next is from deleteOrder call       
        //     console.log('FOUND ORDER WITH ID: ' + orderId);
        //     order.remove();//call premiddleware for Order Model
        //     //After we call remove. middleware (pre) will update user.orders(pull this order)
        //     //after that ORder will be deleted
           
        // });
        // res.status(200).send("Order has been deleted"); 
        
    }catch(err){
        next(err);
    }
}



