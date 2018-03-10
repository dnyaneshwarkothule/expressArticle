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

router.post('/add',function (req, res,next) {
    try {
        var reqObj = req.body;
        console.log(reqObj);

        req.getConnection(function (err, conn) {
            if (err) {
                console.log('Error in database Connection');
            }
            else {
                var queryData = 'INSERT INTO `article` SET ?';
                var insertData = {
                    'NAME' : reqObj.articleName,
                    'AUTHOR': reqObj.articleAuthor,
                    'PRICE': reqObj.articlePrice,
                    'IMG': "http://placehold.it/700x400"
                };

                var query = conn.query(queryData, insertData, function (err, result) {
                    if(err){
                        console.error(" Sql Error : "+err);
                        return next(err);
                    }
                    else {
                        res.redirect('/article');
                    }
                });
            }
        });
    }
    catch (ex){
        console.log(ex);
    }
});

router.get('/edit/:ID', function(req, res, next) {
    var ArticleID = req.params.ID || '';
    try {
        req.getConnection(function (err, conn) {
            if(err){
                console.log("Sql Connection Error : "+err);
                return next(err);
            }
            else {
                var getQry = ' SELECT `ID`, `NAME`, `AUTHOR`, `PRICE` FROM `article`  WHERE `ID` = ?';
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
                        res.render('article/updateArticle', {
                            title: 'Update Article',
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


router.post('/update/:ID',function (req, res,next) {
    var ArticleID = req.params.ID || '';
    try {
        var reqObj = req.body;
        console.log(reqObj);

        req.getConnection(function (err, conn) {
            if (err) {
                console.log('Error in database Connection');
            }
            else {
                var queryData = 'UPDATE `article` SET `NAME`=?,`AUTHOR`=?,`PRICE`=? WHERE `ID`=?';
                var updateData = [
                    reqObj.articleName, reqObj.articleAuthor, reqObj.articlePrice, ArticleID
                ];

                var query = conn.query(queryData, updateData, function (err, result) {
                    if(err){
                        console.error(" Sql Error : "+err);
                        return next(err);
                    }
                    else {
                        res.redirect('/article/view/'+ArticleID);
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