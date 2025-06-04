import express from 'express';
import { registerUser, loginUser } from './auth.controller';
import { registerUserSchema, loginUserSchema } from './auth.dto';
import { validate } from '../common/middlewares/validate';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUser);
router.post('/login', validate(loginUserSchema), loginUser);

export default router;
