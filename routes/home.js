/**
 * Created by Dnyaneshwar on 09/03/2018.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', {
        title: 'Home',
        url : req.originalUrl
    });
});

module.exports = router;
