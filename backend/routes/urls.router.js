const express = require('express');


const urlsRouter = express.Router();

const { addUrl , readUrl , readLongUrl } = require('../controllers/urls.controller')
const { jwtAuthenticate } = require('../middlewares/jwt.middleware')

urlsRouter.route('/addurl').post(jwtAuthenticate , addUrl);
urlsRouter.route('/readurl').get(jwtAuthenticate , readUrl);
urlsRouter.route('/readlongurl/:url').get(jwtAuthenticate , readLongUrl);



module.exports = {
    urlsRouter
}