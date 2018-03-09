/**
 * Created by Dnyaneshwar on 09/03/2018.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    displayArticle(req, res, next);
});

router.get('/:ID', function(req, res, next) {
    displayArticle(req, res, next, req.params.ID);
});

function displayArticle(req, res, next, articleId) {
    try {
        var ArticleID = articleId || '';
        console.log(ArticleID);
        req.getConnection(function (err, conn) {

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
}

module.exports = router;
