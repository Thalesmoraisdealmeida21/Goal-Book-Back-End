import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

const userRouter = Router();

const userController = new UserController();

const authCotnroller = new AuthController();

userRouter.post('/', userController.create);

userRouter.post('/auth', authCotnroller.create);

export default userRouter;
