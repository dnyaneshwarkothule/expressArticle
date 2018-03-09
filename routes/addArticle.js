/**
 * Created by Dnyaneshwar on 09/03/2018.
 */
/**
 * Created by Dnyaneshwar on 09/03/2018.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('addArticle', { title: 'Add Article' });
});

router.post('/', function(req, res, next) {
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
                    'PRICE': reqObj.articlePrice
                };

                var query = conn.query(queryData, insertData, function (err, result) {
                    if(err){
                        console.error(" Sql Error : "+err);
                        return next(err);
                    }
                    else {
                        console.log(result.insertId);
                        return res.json({"ID": result.insertId});
                    }
                });
            }
        });
    }
    catch (ex){
        console.log(ex);
    }
    // res.render('display', { title: res.params });
});

module.exports = router;
