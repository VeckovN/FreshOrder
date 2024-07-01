import mongoose from 'mongoose'
const {Schema} = mongoose;

const OrderSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    products: [ //Many - to - Many --- array of all products in this order
        {
            product:{
                type:Schema.Types.ObjectId, 
                ref:'Product'
            },
            amount:{
                type:Number,
                min:0,
                required:true,
            }
        }
    ],
    isCompleted:{
        type:Boolean,
        default:false,
    }
},
    {timestamps: true}
)
//index on isComplited 
//https://www.percona.com/blog/using-partial-and-sparse-indexes-in-mongodb/

//isCompleted:false is maybe 5%,10% of all orders(docs)(more orders are completed) so we need to create index for better search performace
OrderSchema.index({isCompleted:1}, {partialFilterExpression: {isCompleted:false}})



//MOngoose Middleware
// //THIS WILL HAPPENED BEFORE WE DELETE ORDER(THIS MODEL)
// OrderSchema.pre('remove', async function(next){
//     console.log("THIS ORDER MIDDLEWARE");
//     const order = this; //we know which is this order
//     //that we in controllers use Order.FindById(order_id, CALLBACK(err,order)(in callback we call this order.remove))
//     console.log("ORDER:" +order);
//     const orderID = order._id;
//     await User.updateOne({},{
//         $pull: {
//             orders:{orderID}
//         }
//     })
//     console.log("ORDER ID:" + order._id);
//     next();//go to next middleware
// })

export default mongoose.model('Order', OrderSchema);