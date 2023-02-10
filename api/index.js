import express from 'express'
import dotenv from 'dotenv'
import mongoose, { mongo } from 'mongoose'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';

import authRoute from './routes/auth.js'
import userRoute  from './routes/users.js'
import productRoute from './routes/products.js'
import orderRoute from './routes/orders.js'

const app = express();
dotenv.config();

const connection = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connsected to mongoDB"); 
    }
    catch(err){
        throw err;
    }
}

//CORS Configuration
//allow only React App on :3000 port
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

//WHEN a User makes an request , all middlewares will be checked
//example =- app.use(express.json) -ok in your api request you can use json()
//then another bellow them , and everyone else until the end

//middlewares - it's able to reach our request and response(req,res) before sending anything to user 
app.use(express.json()); //to send Json from Client to express
app.use(cookieParser()); //for cookies
// app.use(express.static(__dirname + '/public'));

// app.use()
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null, '../client/public/products') 
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({storage:storage});
//upload image
app.post('/api/products/create', upload.single('image'), 
    (req,res)=>{
      //controller
      const file = req.file;
      res.status(200).json(file.filename);
  }   
)

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute); 
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

//error handler middlaware
//using this insted res.status(500).json(err); in routes
app.use((err,req,res,next)=>{
    const errStatus = err.status || 500; //if not exists set on 500
    const errMessage = err.message || "Something wrong";
    return res.status(errStatus).json({
        message:errMessage,
        status:errStatus,
        stack:err.stack,
    })
    // return res.status(500).json("Hello error from handler")
})

// const port = 8000;
// app.listen(port, ()=>{
app.listen(process.env.PORT, ()=>{
    connection();
    console.log(`Backend Connected on port: ${process.env.PORT}`);
})