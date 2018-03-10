/**
 * Created by Dnyaneshwar on 10/03/2018.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        req.getConnection(function (err, conn) {
            if(err){
                console.log("Sql Connection Error : "+err);
                return next(err);
            }
            else {
                var getQry = ' SELECT `ID`, `NAME`, `AUTHOR`, `PRICE` FROM `article` ';
                var query = conn.query(getQry,function (err, rows) {
                    if(err){
                        console.error("Sql Error : "+err);
                        return next(err);
                    }
                    else {
                        var articleArray = [];
                        rows.forEach(function (articles) {
                            articleArray.push(articles);
                        });
                        res.render('article/article', {
                            title: 'Article',
                            url : req.originalUrl,
                            articleData : articleArray
                        });
                    }
                });
            }
        });
    }
    catch (ex){
        console.log(ex);
    }
});

router.get('/add', function(req, res, next) {
    res.render('./article/addArticle',
    {
        title: 'Add Article',
        url : req.originalUrl
    });
});

router.get('/view/:ID', function(req, res, next) {
    try {
        var ArticleID = req.params.ID || '';
        req.getConnection(function (err, conn)
        {
            if(err){
                console.log("Sql Connection Error : "+err);
                return next(err);
            }
            else {
                var getQry = ' SELECT `ID`, `NAME`, `AUTHOR`, `PRICE` FROM `article` ';
                if (ArticleID.length>0)
                    getQry += "WHERE `ID` = ?";
                var query = conn.query(getQry,[ArticleID],function (err, rows) {
                    if(err){
                        console.error("Sql Error : "+err);
                        return next(err);
                    }
                    else {
                        var articleArray = [];
                        rows.forEach(function (articles) {
                            articleArray.push(articles);
                        });
                        res.render('./article/viewArticle', {
                            title: 'View Article',
                            url : req.originalUrl,
                            articleData : articleArray
                        });
                    }
                });
            }
        });
    }
    catch (ex){
        console.log(ex);
    }
});
module.exports = router;