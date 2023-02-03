import jws from 'jsonwebtoken'
import { createError } from '../utility/error.js';

//verify middleware - if is token valid -user is authenticated
export const verifyToken = (req,res,next)=> {
    
    const token = req.cookies.access_token;
    //if(!token) //Bug with !token
    if(!token) //does token exist
        return next(createError(401, 'You are not authenticated'));
    
    // req.user = {id:1, isAdmin:false};
    //this middleware will be executed before client response send to him
    //jws return token information -> user  
   
    jws.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err) return next(createError(404, "Token isn't valid"));
        req.user = user; //in request .user put token information(id and isAdmin)
        next();    //go to next operation (in functions bellow WE DONT NEED this and that won't be included in verifyToken execution)
        
    });
};

export const verifyUser = (req,res,next)=>{ //our req,res,next we can use as parameter of other function(example this verifyToken)
    //call function for verifyingToken(He must be authenticated )
    
    //!!!!!!!! If we put next in vertyToken USER WILL BE ALWAYS AUTHENTICATED, 
    //because next() in  verifyToken is last in jws.verify but we don't need to go on next middleware
    // verifyToken(req,res,next, ()=>{ 
    verifyToken(req,res,next, ()=>{ //of course add callback function
        //prevent other user can't go on next action
        if(req.user.id === req.params.id || req.user.isAdmin){ //we can use req.user defined in verifyToken funct above
            //that mean user is same as requested - because in route when we will use this middleware we send id through url -> /checkuser/:id
            //we are the owner of token
            next()
        }
        else{
            return next(createError(403, "You are not authorized!"));
        }
    });
}

//IS ADMIN

export const verifyAdmin = (req, res, next) =>{
    //HERE WIHTOUT NEXT() IN VERIFTTOKEN???
    verifyToken(req,res, ()=>{//callback if is all alright(if isnt vertyToken return error);
        if(req.user.isAdmin){
            next(); 
        }
        else
            return next(createError(403 , "You don't have permission to do that"));
    })
}