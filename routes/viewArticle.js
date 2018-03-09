/**
 * Created by Dnyaneshwar on 10/03/2018.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:ID', function(req, res, next) {
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
                        res.render('viewArticle', {
                            title: 'View Article',
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
});

module.exports = router;
