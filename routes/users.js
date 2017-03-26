var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );

var Item = require('../src/model/item');

/* GET users listing. */
router.get('/', function(req, res, next) {

    Item.find(function (error, items) {
        if (error) {
            response.status(500).send(error);
            return;
        }

        console.log(items);
        res.json(items);
    });
});


router.post('/', function(req, res) {

    console.log('POST /items = ', req.body);
    var item = new Item(req.body);

    item.save(function (err) {
        console.log("Error : ", err);
    });

    res.status(201).send(item);

});

module.exports = router;
