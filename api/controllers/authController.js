import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import {createError} from '../utility/error.js'

//MongoDB Indexes
//https://www.mongodb.com/blog/post/performance-best-practices-indexing

dotenv.config();

export const register = async (req,res,next) =>{

    try{
        const body = req.body;
        // if(!(body.email && body.password)){
        //     return res.status(400).send('Data missing in form')
        // }

        // const userRegisted = await User.findOne({email: body.email});
        // if(userRegisted){
        //     //user exists in DB - registed 
        //     res.send('You already have an account')
        //     res.redirect('/api/auth/login');
        // }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            address:req.body.address,
            phone_number: req.body.phone_number
        })

        const saveUser = await newUser.save();
        //if sucessfully
        res.status(200).send('User: ' + saveUser.username + ' created');
        //other way without await
        //newUser.save().then((doc) => res.status(200).send("UserCreated: /n"  + doc));
    }
    catch(err){
        next(err);
    }
}

export const login = async (req,res,next)=>{
    try{    
        
        //emailUser is alias(JSON --> "email" , "password")
        const {email:emailUser,password:passwordUser} = req.body;  //ES6 - destructing
        //const emailUser = body.email  ---- ES5
        const user = await User.findOne({email: emailUser})
        if(!user){
            // return res.status(400).send("User not Found"); instead sending handling error like this , we could use middleware
            //create custom error here - and put it as argument of next-error middleware
            return next(createError(404, 'Email Addres or Password not correct'));
        }
        
        const passwordCorrect = await bcrypt.compare(passwordUser, user.password);
        if(!passwordCorrect)
            return next(createError(400, 'Email Addres or Password not correct'))
        
        //hash this information in token
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY);
        //then store send token to client which he put it in cokie

        //won't send password and isAdmin prop to client as response
        //const {password, isAdmin, ...otherProps} = user._doc;  //use ._doc because user object has more information then necessary for us 
        const {password, ...otherProps} = user._doc;

        //if everything is alright then login user and send him information about himself
        //set cookie and put created Token
        res.cookie('access_token', token,{
            httpOnly:true, //doesn't allow any client secret tool to access the cookie
        })
        .status(200)
        .json({...otherProps}); /// ... send only props inside otherProps object not whole object
        
        console.log("LOGGED");
    }
    catch(err){
        next(err)
    }
}