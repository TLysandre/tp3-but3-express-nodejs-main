import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, signup, login, deleteUser } from '../controllers/user.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth-middleware.js';

const userRouter = express.Router();

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(verifyToken, checkRole(['admin']), deleteUser);

userRouter
    .route('/signup')
    .post(signup, verifyToken, checkRole(['admin']));

userRouter
    .route('/login')
    .post(login);

export { userRouter };
