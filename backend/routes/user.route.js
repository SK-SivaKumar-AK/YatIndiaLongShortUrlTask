const express = require('express');


const userRouter = express.Router();


const { userSignin , userLogin , userLogout } = require('../controllers/user.controller')


userRouter.route('/signin').post(userSignin);
userRouter.route('/login').post(userLogin);
userRouter.route('/logout').post(userLogout);



module.exports = {
    userRouter
}