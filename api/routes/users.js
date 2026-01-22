import express from 'express'

import {updateUser, deleteUser, getUser, getUsers, getUserCount} from '../controllers/userController.js'
import {verifyUser, verifyAdmin} from '../utility/verifyToken.js';
import { apiReadLimiter, apiWriteLimiter } from '../utility/rateLimiter.js';

const router = express.Router();

router.put('/updateuser/:id', apiWriteLimiter, verifyUser, updateUser);
router.put('/:id', apiWriteLimiter, verifyAdmin ,updateUser);
router.delete('/:id', apiWriteLimiter, verifyUser, deleteUser);
router.get('/count', apiReadLimiter, verifyUser ,getUserCount);
router.get('/:id', apiReadLimiter, verifyUser, getUser);
//But only an admin could see all users
router.get('/', apiReadLimiter, verifyAdmin, getUsers);

export default router


