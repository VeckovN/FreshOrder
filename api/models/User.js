import mongoose from 'mongoose'
import Order from './Order.js'
//indexes 
//https://www.percona.com/blog/using-partial-and-sparse-indexes-in-mongodb/

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone_number:{
        type:String,
        min:9, 
        // max:13, 
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    //user has many Orders (One to Many())
    orders:[{
        type:Schema.Types.ObjectId,
        ref:'Order'
    }]

},
    {timestamps: true}
)

//casscade delete - delete all orders that the user contains

//this will be executed beofore the user is deleted
UserSchema.pre('remove', async function(next){
    console.log("MIDDLEWARE ENTERED");
    const user = this; //this-> User.FindById(userID)-->in contorollers
    //HOW WE KNOW WHO IS 'this' user
    //before this middleware is called we got User.findById(userID, (err, order)=>{
    //using this User.findByID(err, THIS MIDDLEWARE) 
    await Order.deleteMany({
         _id:{
            $in:user.orders
         }})
    console.log("ORDERS DELETED WHICH USER CONTAINS");
    next(); //go to next middleware (this not neccessary in this case but its preventive)
})

export default mongoose.model('User', UserSchema);