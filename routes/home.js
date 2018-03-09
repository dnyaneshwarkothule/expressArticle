/**
 * Created by Dnyaneshwar on 09/03/2018.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('home', { title: 'Article Home' });
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
                        res.render('home', {
                            title: 'Article',
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

router.get('/:ID', function(req, res, next) {

    try {
        var ArticleID = req.params.ID || '';
        console.log("ARTICLE ID : "+ArticleID.length);
        req.getConnection(function (err, conn) {

            if(err){
                console.log("Sql Connection Error : "+err);
                return next(err);
            }
            else {
                var getQry = ' SELECT `ID`, `NAME`, `AUTHOR`, `PRICE` FROM `article` ';
                if(ArticleID.length > 0)
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
                        res.render('home', {
                            title: 'Article',
                            articleData : articleArray
                        });
                        console.log(articleArray);
                    }
                });
                console.log(query.sql);
            }
        });
    }
    catch (ex){
        console.log(ex);
    }

    // res.render('display', { title: 'Article Home' });
});

module.exports = router;
