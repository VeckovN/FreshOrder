import express from 'express'

import {updateUser, deleteUser, getUser, getUsers, getUserCount} from '../controllers/userController.js'
import {verifyUser, verifyAdmin} from '../utility/verifyToken.js';

const router = express.Router();

router.put('/updateuser/:id', verifyUser, updateUser);
router.put('/:id', verifyAdmin ,updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/count', verifyUser ,getUserCount);
router.get('/:id', verifyUser, getUser);
//But only an admin could see all users
router.get('/', verifyAdmin, getUsers);

export default router


