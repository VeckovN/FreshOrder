import express from 'express'

import {updateUser, deleteUser, getUser, getUsers, getUserCount} from '../controllers/userController.js'

import {verifyUser, verifyAdmin} from '../utility/verifyToken.js';

const router = express.Router();

//used in index.js (all routes of users starts with /users)
//app.use("/users", userRoute); 

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


