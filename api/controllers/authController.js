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
        const userRegisted = await User.findOne({email: body.email});
        if(userRegisted){
            return next(createError(404, 'Email Addres exists'));
        }
        const user = await User.findOne({username:body.username});
        if(user){
            return next(createError(404, 'Username exists'));
        }

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
        //newUser.save().then((doc) => res.status(200).send("UserCreated: /n"  + doc)); noawait sync
        res.status(200).send('User: ' + saveUser.username + ' created');
    }
    catch(err){
        next(err);
    }
}

export const login = async (req,res,next)=>{
    try{    
        const {email:emailUser,password:passwordUser} = req.body;
        const user = await User.findOne({email: emailUser})
        if(!user)
            return next(createError(404, 'Email Addres or Password not correct'));
        
        const password_length = passwordUser.length; //get Number of password(used to show number of character as '*' in user Password(info))
        
        const passwordCorrect = await bcrypt.compare(passwordUser, user.password);
        if(!passwordCorrect)
            return next(createError(400, 'Email Addres or Password not correct'))
        
        //hash this information in token
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY, {expiresIn: '15m'}); 

        //won't send password and isAdmin prop to client as response
        const {password, ...otherProps} = user._doc; //won't send password and isAdmin prop to client as response
        otherProps.password_length = password_length; 
        otherProps.accessToken = token; //set token in response

        res.status(200)
            .json({...otherProps});
    }
    catch(err){
        next(err)
    }
}

export const refresh = async(req,res) =>{
    try{
        const refresh_token = req.body.token; 
        if(!refresh_token)
            return res.status(401).json("You're not authenticated");

        //generate the new token(based on an old one) and send it back to the user
        //first verify token (take user info from it) and with this user info create new token
        jwt.verify(refresh_token, process.env.SECRET_KEY, (err,user) =>{
            if(err)
                console.log(err);

            const new_token  = jwt.sign({id:user.id, isAdmin:user.isAdmin}, process.env.SECRET_KEY, {expiresIn: '15m'}); 

            res.status(200).json({
                new_token: new_token
            })
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }    
}