import express from "express";
import usersRouter from './users.js';
import viewRouter from "./view.js";
const router = express.Router();

console.log('router loaded');
/* redirecting to the  */
router.use('/',viewRouter);
router.use('/api/users', usersRouter);


export default router;
