const mongoose = require('mongoose');

const urlStructure = new mongoose.Schema({
    longUrl : {
        type : String,
        required : true,
        unique : true
    },
    shortUrl : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
});


const urlTable = mongoose.model('urls' , urlStructure);


module.exports = {
    urlTable
}