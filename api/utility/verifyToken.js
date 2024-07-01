import jwt from 'jsonwebtoken'

export const verifyUser = (req,res,next)=> {
    const authHeader = req.headers.authorization;
    
    if(authHeader) 
    {
        const token = authHeader.split(" ")[1]; //split[0] = Bearer split[1] is AccessToken
        jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
            //user is payload(data from token)
            if(err)
                return res.status(401).json("Token ins't valid")

            //If is token valid you're authenticated (user or admin)
            req.user = user; //this req.user we can use in request function(route function)
            next();
        })
    }
    else //if the token doesn't exist, it means that the user isn't authenticated 
        res.status(401).json("You're not authenticated");
};

export const verifyAdmin = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(authHeader) 
    {
        const token = authHeader.split(" ")[1]; 
        jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
            if(err)
                return res.status(401).json("Token ins't valid")
                
            if(user.isAdmin){ //we can use req.user defined in verifyToken funct above  
                req.user = user; //this req.user we can use in request function( route function)
                next();
            }
            else
                res.status(401).json("You are not authentucated");
        })
    }
    else 
        res.status(401).json("You're not authenticated");
}