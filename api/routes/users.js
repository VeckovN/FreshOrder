import express from 'express'

import {updateUser, deleteUser, getUser, getUsers, getUserCount} from '../controllers/userController.js'

import {verifyUser, verifyAdmin, verifyToken, verUser, verAdmin} from '../utility/verifyToken.js';

const router = express.Router();

//used in index.js (all routes of users starts with /users)
//app.use("/users", userRoute); 

//RRRRR router.put('/updateuser/:id', verifyAdmin, updateUser);
// router.put('/updateuser/:id', updateUser);
router.put('/updateuser/:id', verUser, updateUser);

//only logged user(btw admin as well,because this verifyUser give also
// permision to admin) can change your account 
// router.put('/:id', verifyUser ,updateUser);
router.put('/:id', verAdmin ,updateUser);

//delete --- api/products/:id
// router.delete('/:id', verifyUser, deleteUser);
router.delete('/:id', deleteUser);
router.delete('/:id', verUser, deleteUser);

//get himself(information) to show self info in fromnted
// router.get('/count', getUserCount);
router.get('/count', verUser ,getUserCount);

//RRRRR router.get('/:id', verifyUser, getUser);
// router.get('/:id', getUser);

// router.get('/:id', verifyUser, getUser);
router.get('/:id', verUser, getUser);

//But only admin could see all users
// AAAAAAAA router.get('/', verifyAdmin, getUsers);
// router.get('/',  getUsers);

// router.get('/', verifyAdmin, getUsers);
router.get('/', verAdmin, getUsers);


export default router


