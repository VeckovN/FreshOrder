import mongoose from 'mongoose'

const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
    //CastError: Cast to ObjectId failed for value
    //problem solved
    // _id:{
    //     type:String,
    //     unique:true
    // },
    name:{ 
        type:String,
        required:true,
        unique:true,
    },
    // category: {type:String, enum:[] , required:true}
    category: {
        type:String, 
        // enum:['Pizza', 'Pasta', 'Burger' ,'Salat','Drinks', 'Desert'], 
        enum:['Pizza', 'Pasta', 'Burger' ,'Salat','Drinks', 'Desert'],
        required:true
    },
    description: {
        type:String, 
        maxLength:300, 
        required:true
    },
    price: {
        type:Number, 
        min:0, 
        required:true
    },
    img_path:{ 
        type:String, 
        required:false
    },
    isDeleted: {
        type:Boolean,
        default:false, 
        // required: true
    }, //soft-shadow delete
    //last prop is the array of orders in which this product belongs
    orders:{
        type:Schema.Types.ObjectId,
        ref:'Order'
    }

})


export default mongoose.model('Product', ProductSchema);