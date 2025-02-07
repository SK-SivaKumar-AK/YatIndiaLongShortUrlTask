const express = require('express');
const dotEnv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
dotEnv.config({
    path : path.join(__dirname , 'config' , '.env')
});



app.use(express.json());
app.use(express.urlencoded( { extended:true } ));
app.use(cookieParser());
const allowedOrigins = process.env.FRONTEND_URL.split(',');
app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
}));


const { connectDatabase } = require('./config/database');
const { userRouter } = require('./routes/user.route');
const { urlsRouter } = require('./routes/urls.router');


connectDatabase();
app.use('/' , userRouter);
app.use('/' , urlsRouter);
app.get('/test', (req, res) => {
    res.send('This is the backend home route!!');
});




app.listen(process.env.PORT , () => {
    console.log(`Server is Running on ${process.env.PORT} PORT in ${process.env.NODE_ENV} Environment.`);
}).on('error' , (error) => {
    console.log(error.message);
});