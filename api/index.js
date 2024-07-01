import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';

import authRoute from './routes/auth.js'
import userRoute  from './routes/users.js'
import productRoute from './routes/products.js'
import orderRoute from './routes/orders.js'

const app = express();
dotenv.config();

app.use(express.json()); 
app.use(cookieParser()); 

const connection = async () =>{
    try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to mongoDB"); 
    }
    catch(err){
      throw err;
    }
}

//CORS Configuration (react app allowed)
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

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null, '../client/src/assets/products');
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({storage:storage});
app.post('/api/products/create', upload.single('image'), 
    (req,res)=>{
      const file = req.file;
      res.status(200).json(file.filename);
  }   
)

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute); 
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500; //if not exists set on 500
    const errMessage = err.message || "Something wrong";
    return res.status(errStatus).json({
        message:errMessage,
        status:errStatus,
        stack:err.stack,
    })
})

app.listen(process.env.PORT, ()=>{
    connection();
    console.log(`Backend Connected on port: ${process.env.PORT}`);
})