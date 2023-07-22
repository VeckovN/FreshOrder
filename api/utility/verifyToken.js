import jwt from 'jsonwebtoken'

export const verifyUser = (req,res,next)=> {
    
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
        })

    }else { //if isn't token it mean we're not authenticated
        res.status(401).json("You're not authenticated");
    }
};


//Check does user is authenticated(logged) and then check if is he admin
export const verifyAdmin = (req,res,next) =>{
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