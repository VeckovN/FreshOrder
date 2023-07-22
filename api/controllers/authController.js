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

            return next(createError(404, 'Email Addres or Password not correct'));
        }

        //get Number of password(used to show number of character as * in user Password(info))
        const password_length = passwordUser.length;
        
        const passwordCorrect = await bcrypt.compare(passwordUser, user.password);
        if(!passwordCorrect)
            return next(createError(400, 'Email Addres or Password not correct'))
        
        //hash this information in token
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY, {expiresIn:'2m'});
        //then store send token to client which he put it in cokie

        //won't send password and isAdmin prop to client as response
        //const {password, isAdmin, ...otherProps} = user._doc;  //use ._doc because user object has more information then necessary for us 
        const {password, ...otherProps} = user._doc;
        otherProps.password_length = password_length;
        //set token in response
        otherProps.accessToken = token;

        //if everything is alright then login user and send him information about himself
        //set cookie and put created Token(with cookie-parser middleware)
        // res.cookie('access_token', token,{
        //     httpOnly:true, //doesn't allow any client secret tool to access the cookie
        // })
        // res.status(200)
        // .json({...otherProps}); 
    
        res.status(200)
            .json({...otherProps});

        console.log("LOGGED");
        console.log("TOKKEN: " + token);

    }
    catch(err){
        next(err)
    }
}

export const refresh = async(req,res) =>{

    try{
        //take the token from the user
        const refresh_token = req.body.token; //it will be send through post method

        //if token doesn't exist or it's invalid send error
        if(!refresh_token)
            return res.status(401).json("You're not authenticated");

        //if is it ok then generate new token based on old one(refresh token and send to user)

        // let new_token;
        //first verify token (take user info from it) and with this user info create new token
        jwt.verify(refresh_token, process.env.SECRET_KEY, (err,user) =>{
            if(err)
                console.log(err);

            //use same info as old token
            const new_token  = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY, {expiresIn:'10s'});

            res.status(200).json({
                new_token: new_token
            })
        })
    }
    catch(err){
        console.log(err);
    }
    
    
}