const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
const path = require('path');




dotEnv.config({
    path : path.join(__dirname , '..' , 'config' , '.env')
});



const jwtAuthenticate = async (req , res , next) => {
    try {

        const cookieValue = req.cookies;
        
        if(cookieValue != undefined){
            
            if(cookieValue.accessToken != undefined){
                
                const decodeData = await jwt.verify(cookieValue.accessToken , process.env.JWT_ACCESS_TOKEN_SECRET);
                req.userId = decodeData.userId;
                next();

            }else if(cookieValue.refreshToken != undefined){
                
                const decodeData = await jwt.verify(cookieValue.refreshToken , process.env.JWT_REFRESH_TOKEN_SECRET);
                const accessToken = await jwt.sign(
                    {
                        userId : decodeData.userId
                    },
                    process.env.JWT_ACCESS_TOKEN_SECRET,
                    {
                        expiresIn : process.env.JWT_ACCESS_TOKEN_EXP
                    }
                );
                res.cookie('accessToken' , accessToken , {
                    secure : true,
                    maxAge : 1 * 60 * 1000,
                    httpOnly: true,
                    sameSite: 'None'
                });
                req.userId = decodeData.userId;
                next();

            }else{
                
                return res.status(200).json({
                    Result : false,
                    Message : 'No Token Available!'
                });

            }
        }else{
            
            return res.status(200).json({
                Result : false,
                Message : 'No Token Available!'
            });

        }

    } catch (error) {

        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
}


module.exports = {
    jwtAuthenticate
}


