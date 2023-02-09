import express from 'express'

import {updateUser, deleteUser, getUser, getUsers, getUserCount} from '../controllers/userController.js'

import {verifyUser, verifyAdmin} from '../utility/verifyToken.js';

const router = express.Router();

//used in index.js (all routes of users starts with /users)
//app.use("/users", userRoute); 


//HOW MIDDLEWARE WORKS PASSED IN ROUTER
//Whenever we make request /checkauthentication it's gonna go to 
//verifyToken(and if everything is alright it's gonna say next())
//and we are gonna come back here on (req,res,next) function ->when is next() executed in verifyToken
// router.get('/checkauthentication', verifyToken, (req,res,next)=>{
//     res.send("Hello user, you are authenticated(logged)")
// });

// router.get('/updateuser/:id', verifyUser, (req,res,next)=>{
//     res.send("Hello user, you are authenticated(logged)")
// });

// router.get('/admin/:id', verifyAdmin, (req,res,next)=>{
//     res.send("HEllo admin")
// });

//RRRRR router.put('/updateuser/:id', verifyAdmin, updateUser);
router.put('/updateuser/:id', updateUser);

//only logged user(btw admin as well,because this verifyUser give also
// permision to admin) can change your account 
router.put('/:id', verifyUser ,updateUser);
//delete --- api/products/:id
// router.delete('/:id', verifyUser, deleteUser);
router.delete('/:id', deleteUser);
//get himself(information) to show self info in fromnted
router.get('/count', getUserCount);
//RRRRR router.get('/:id', verifyUser, getUser);
router.get('/:id', getUser);
//But only admin could see all users
// AAAAAAAA router.get('/', verifyAdmin, getUsers);
router.get('/',  getUsers);


export default router


