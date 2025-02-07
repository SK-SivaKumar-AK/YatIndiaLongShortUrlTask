const dotEnv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');


dotEnv.config({
    path : path.join(__dirname , '..' , 'config' , '.env')
});


const { userTable } = require('../models/user.model');



const userSignin = async (req , res) => {
    try {

        const { userEmail , userPassword } = req.body;
        
        const addUser = new userTable({
            userEmail : userEmail,
            userPassword : userPassword
        });

        const addedUser = await addUser.save();

        return res.status(200).json({
            Result : true,
            Message : 'SignIn Successfully!',
            data : addedUser
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
}

const userLogin = async (req , res) => {
    try {

        const { userEmail , userPassword } = req.body;
       
        const checkUser = await userTable.findOne({ userEmail : userEmail});
        if(!checkUser){
            return res.status(200).json({
                Result : false,
                Message : 'Invalid Email!'
            });
        }

        const checkPassword = await checkUser.comparePassword(userPassword);
        if(!checkPassword){
            return res.status(200).json({
                Result : false,
                Message : 'Invalid Password!'
            });
        }

        const accessToken = await jwt.sign(
            {
                userId : checkUser._id
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.JWT_ACCESS_TOKEN_EXP
            }
        );
        res.cookie('accessToken' , accessToken , {
            secure : process.env.NODE_ENV === 'Development' ? true : false,
            maxAge : 60 * 60 * 1000,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'Development' ? 'None' : 'Strict'
        });

        const refreshToken = await jwt.sign(
            {
                userId : checkUser._id
            },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            {
                expiresIn : process.env.JWT_REFRESH_TOKEN_EXP
            }
        );
        res.cookie('refreshToken' , refreshToken , {
            secure : process.env.NODE_ENV === 'Development' ? true : false,
            maxAge : 120 * 60 * 1000,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'Development' ? 'None' : 'Strict'
        });
        


        return res.status(200).json({
            Result : true,
            Message : 'Login SuccessFully!',
            data : checkUser
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
}

const userLogout = (req , res) => {
    try {

        res.clearCookie('accessToken', { 
            secure: process.env.NODE_ENV === 'Development' ? true : false,
            httpOnly: true, 
            sameSite: process.env.NODE_ENV === 'Development' ? 'None' : 'Strict'
        });
        res.clearCookie('refreshToken', { 
            secure: process.env.NODE_ENV === 'Development' ? true : false,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'Development' ? 'None' : 'Strict'
        });
        return res.status(200).json({
            Result : true,
            Message : 'Logout SuccessFully!',
            data : ''
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
}

module.exports = {
    userSignin,
    userLogin,
    userLogout
}