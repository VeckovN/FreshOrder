import jwt from 'jsonwebtoken'
import { createError } from '../utility/error.js';

//verify middleware - if is token valid -user is authenticated
export const verifyToken = (req,res,next)=> {
    
    //we don't use cookies anymore
    // const token = req.cookies.access_token; 
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:" + authHeader) 

    // console.log("TOKEEEEEEEEEEN : " + token);
    // //if(!token) //Bug with !token
    // if(!token) //does token exist
    //     return next(createError(401, 'You are not authenticated'));
    
    // // req.user = {id:1, isAdmin:false};
    // //this middleware will be executed before client response send to him
    // //jwt return token information -> user  
   
    // jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
    //     if(err) return next(createError(404, "Token isn't valid"));
    //     req.user = user; //in request .user put token information(id and isAdmin)
    //     next();    //go to next operation (in functions bellow WE DONT NEED this and that won't be included in verifyToken execution)
        
    // });

    if(authHeader) 
    {
        const token = authHeader.split(" ")[1]; //split[0] = Bearer split[1] is AccessToken
        
        console.log("TOKKENNN  :" + token);
        //we got token from client request(header) and now verify
        jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
            //user is payload(data from token)
            if(err)
                return res.status(401).json("Token ins't valid")
            
            req.user = user; //this req.user we can use in request function( route function)
            next();
        })

    }else { //if isn't token it mean we're not authenticated
        res.status(401).json("You're not authenticated");
    }
};


export const verify = (req,res,next) =>{
    //take from request Header -> when is sent request(from client- he send tokent through header )
    //This verifyToken is executed after client request and before runing code in function
    const authHeader = req.headers.authorization;

    //in Header is "Bearer ACCESSTOKEN(KEY)"
    if(authHeader) 
    {
        const token = authHeader.spilt(" ")[1]; //split[0] = Bearer split[1] is AccessToken
        //we got token from client request(header) and now verify
        jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
            //user is payload(data from token)
            if(err)
                return res.status(401).json("Token ins't valid")
            
            req.user = user; //this req.user we can use in request function( route function)
            next();
        })

    }else { //if isn't token it mean we're not authenticated
        res.status(401).json("You're not authenticated");
    }
}

export const verifyUser = (req,res,next)=>{ //our req,res,next we can use as parameter of other function(example this verifyToken)
    //call function for verifyingToken(He must be authenticated )
    verifyToken(req,res,next, ()=>{ //of course add callback function

        console.log("HEEEEEEEERRRRRRRREEEEEEEE");

        console.log("UUUUUSEEERRRR ID :" + req.user.id);
        console.log("P{ARA<S ID : " + req.params.id);

        //prevent other user can't go on next action
        if(req.user.id === req.params.id || req.user.isAdmin){ //we can use req.user defined in verifyToken funct above
            //that mean user is same as requested - because in route when we will use this middleware we send id through url -> /checkuser/:id
            //we are the owner of token

            console.log("ADMINS: " + req.isAdmin);

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
    verifyToken(req,res, next, ()=>{//callback if is all alright(if isnt vertyToken return error);
        if(req.user.isAdmin){
            next(); 
        }
        else
            return next(createError(403 , "You don't have permission to do that"));
    })
}



export const verUser = (req,res,next)=> {
    
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:" + authHeader) 

    if(authHeader) 
    {
        const token = authHeader.split(" ")[1]; //split[0] = Bearer split[1] is AccessToken
        
        console.log("TOKKENNN  :" + token);
        jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
            //user is payload(data from token)
            if(err)
                return res.status(401).json("Token ins't valid")

            //If is token valid you are 100% authenticated (user or admin) and you can do action
            req.user = user; //this req.user we can use in request function( route function)
            next();

            // console.log("USER ID " + user.id);
            // console.log("USER PARAMS ID: " + req.params.id);
                
            // if(user.id === req.params.id || user.isAdmin){ //we can use req.user defined in verifyToken funct above  
            //     console.log("ADMINS: " + user.isAdmin);

            //     req.user = user; //this req.user we can use in request function( route function)
            //     next();
            // }
            // else
            //     res.status(401).json("You are not authentucated");
        })

    }else { //if isn't token it mean we're not authenticated
        res.status(401).json("You're not authenticated");
    }
};


//Check does user is authenticated(logged) and then check if is he admin
export const verAdmin = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:" + authHeader) 

    if(authHeader) 
    {
        const token = authHeader.split(" ")[1]; //split[0] = Bearer split[1] is AccessToken
        
        console.log("TOKKENNN  :" + token);
        jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
            //user is payload(data from token)
            if(err)
                return res.status(401).json("Token ins't valid")
                
            if(user.isAdmin){ //we can use req.user defined in verifyToken funct above  
                console.log("ADMINS: " + user.isAdmin);

                req.user = user; //this req.user we can use in request function( route function)
                next();
            }
            else
                res.status(401).json("You are not authentucated");
        })

    }else { //if isn't token it mean we're not authenticated
        res.status(401).json("You're not authenticated");
    }
}