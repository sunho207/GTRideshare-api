/*
Carpool Routes
*/

var express = require('express');
var router = express.Router();
var _ = require('underscore');

var carpoolerModel = require('../models/carpoolerModel');

/*
* POST carpooler
*/
router.post('/', function(req, res, next) {
    var requiredColumns = ["user_id","carpool_id","user_lat", "user_lng", "user_address" ]; 
	if (checkRequiredColumns(req.body,requiredColumns)) {
        carpoolerModel.joinCarpool(req.body.user_id, req.body.carpool_id, req.body.user_lat, req.body.user_lng, req.body.user_address, 0, function(result) {
            if (result) {
				res.sendStatus(200); //Ok
			}
        });
	} else { //Bad Request
		res.sendStatus(400);
	}
});

/*
* PUT carpooler
*/
router.put('/', function(req, res, next) {
    var requiredColumns = ["user_id","carpool_id"]; 
	if (checkRequiredColumns(req.body,requiredColumns)) {
        carpoolerModel.acceptCarpooler(req.body.user_id, req.body.carpool_id, function(result) {
            if (result) {
				res.sendStatus(200); //Ok
			}
        });
	} else { //Bad Request
		res.sendStatus(400);
	}
});

/*
* POST carpooler
*/
router.delete('/', function(req, res, next) {
    var requiredColumns = ["user_id","carpool_id" ]; 
	if (checkRequiredColumns(req.body,requiredColumns)) {
        carpoolerModel.deleteCarpooler(req.body.user_id, req.body.carpool_id, function(result) {
            if (result) {
				res.sendStatus(200); //Ok
			}
        });
	} else { //Bad Request
		res.sendStatus(400);
	}
});

// Helpers & Exports \\

var checkRequiredColumns = function(requestBody, requiredColumns) {
	var columnsPresent = Object.getOwnPropertyNames(requestBody); //gets the column names from the request body
	if (_.isEqual(requiredColumns,columnsPresent)) {
		return true;
	} else {
		return false;
	}
}

module.exports = router;