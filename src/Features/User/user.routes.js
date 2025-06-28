import express from 'express';
import UserControllers from './user.controller.js';
import jwtMiddleware from '../../Middlewares/jwt.middlewares.js';

const userRouter = express.Router();

const userControllers = new UserControllers();
userRouter.post('/signup', (req, res) => userControllers.signUp(req, res));
userRouter.post('/signin', (req, res) => userControllers.signIn(req, res));
userRouter.post('/resetpassword', jwtMiddleware, (req, res) => userControllers.resetPassword(req, res));



export default userRouter;