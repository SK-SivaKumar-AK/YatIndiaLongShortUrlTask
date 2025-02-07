const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const path = require('path');



dotEnv.config({
    path : path.join(__dirname , '.env')
});




const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then((connect) => {
        console.log(`Database is connected in ${connect.connection.host}`);
    }).catch((error) => {
        console.log(error.message);
    })
};




module.exports = {
    connectDatabase
}