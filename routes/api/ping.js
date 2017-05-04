/**
 * Created by senthil on 04/04/17.
 */

var express = require('express')
    , router = express.Router()
    , pingService = require('../../src/search/api/ping')
    , Status = require('../../src/common/domains/Status');

/* GET users listing. */
router.get('/', function(req, res, next) {

    console.info("req.query.keyword = ", req.query.keyword);
    res.json({keyword : req.query.keyword});
    /* Check save is pining. */
    /*pingService.checkSlave({requestTimeout: Infinity}, function(error, response, status) {
        Status.code = status;
        Status.message = response;
        res.json({status : Status});
    });*/

});

module.exports = router;