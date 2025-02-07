const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userStructure = new mongoose.Schema({
    userEmail : {
        type : String,
        required : true,
        unique : true
    },
    userPassword : {
        type : String,
        required : true
    }
});



userStructure.pre('save' , async function(next){
    this.userPassword = await bcrypt.hash(this.userPassword , 10);
    next();
});

userStructure.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword , this.userPassword);
} 



const userTable = mongoose.model('user' , userStructure);



module.exports = {
    userTable
}