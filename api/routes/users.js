import express from 'express'

import {updateUser, deleteUser, getUser, getUsers, getUserCount} from '../controllers/userController.js'

import {verifyUser, verifyAdmin} from '../utility/verifyToken.js';

const router = express.Router();

//used in index.js (all routes of users starts with /users)
router.put('/updateuser/:id', verifyUser, updateUser);
router.put('/:id', verifyAdmin ,updateUser);
//delete --- api/products/:id
router.delete('/:id', deleteUser);
router.delete('/:id', verifyUser, deleteUser);
//get himself(information) to show self info in fromnted
router.get('/count', verifyUser ,getUserCount);
router.get('/:id', verifyUser, getUser);
//But only admin could see all users
router.get('/', verifyAdmin, getUsers);

export default router


