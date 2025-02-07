const express = require('express');


const userRouter = express.Router();


const { userSignin , userLogin , getUser , userLogout } = require('../controllers/user.controller')
const { jwtAuthenticate } = require('../middlewares/jwt.middleware')


userRouter.route('/signin').post(userSignin);
userRouter.route('/login').post(userLogin);
userRouter.route('/getuser').get(jwtAuthenticate , getUser);
userRouter.route('/logout').post(jwtAuthenticate , userLogout);



module.exports = {
    userRouter
}