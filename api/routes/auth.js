import express from 'express'
import { register, login , refresh} from '../controllers/authController.js';
import { loginLimiter, authLimiter, refreshLimiter } from '../utility/rateLimiter.js';

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', loginLimiter, login);
router.post('/refresh', refreshLimiter, refresh);

export default router


