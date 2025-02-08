const shortid = require("shortid");


const { urlTable } = require('../models/urls.model');


const addUrl = async (req , res) => {
    try {

        const userId = req.userId;
        const { longUrl } = req.body;
        
        const existingUrl = await urlTable.find({ longUrl : longUrl });
        if (existingUrl && existingUrl.length > 0) {
            return res.status(200).json({
                Result : false,
                Message : 'Already Added This URL!',
                data : existingUrl
            });
        }

        const shortUrl = shortid.generate(); 

        const addUrl = new urlTable({
            longUrl : longUrl,
            shortUrl : shortUrl,
            userId : userId
        });

        const addedUrl = await addUrl.save();

        return res.status(200).json({
            Result : true,
            Message : 'Added Successfully!',
            data : addedUrl
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
}

const readUrl = async (req , res) => {
    try {
        
        const userId = req.userId;

        const readUrl = await urlTable.find({userId : userId});

        return res.status(200).json({
            Result : true,
            Message : 'Read SuccessFully!',
            data : readUrl
        });
    
    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });
    
    }
};

const deleteUrl = async (req , res) => {
    try {
        
        const Id = req.params.id;

        const deletedInfo = await urlTable.findOneAndDelete({_id : Id});
        
        return res.status(200).json({
            Result : true,
            Message : 'Deleted SuccessFully!',
            data : deletedInfo
        });
    
    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });
    
    }
};

const readLongUrl = async (req , res) => {
    try {
        
        
        const shortUrl  = req.params.url;
        
        const readLongUrl = await urlTable.find({shortUrl : shortUrl});
        
        res.redirect(readLongUrl[0].longUrl);
        // return res.status(200).json({
        //     Result : true,
        //     Message : 'Read SuccessFully!',
        //     data : readLongUrl
        // });
    
    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });
    
    }
};



module.exports = {
    addUrl,
    readUrl,
    deleteUrl,
    readLongUrl
}