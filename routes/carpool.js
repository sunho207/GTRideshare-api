/*
Carpool Routes
*/

var express = require('express');
var router = express.Router();
var _ = require('underscore');

var carpoolModel = require('../models/carpoolModel');

/*
* GET carpool
*/
router.get('/', function(req, res, next) {
    if (req.query.lat != null && req.query.lng != null) {
        carpoolModel.getAllCarpools(req.query.lat, req.query.lng, function(result) {
            if (result != null) {
				res.send(result); //Ok
			}
			else {
				res.sendStatus(500); //Internal Server Error
			}
        });
	} else { //Bad Request
		res.sendStatus(400);
	}
});

/*
* POST carpool
*/
router.post('/', function(req, res, next) {
    var requiredColumns = ["user_id","lat", "lng", "arrival", "departure", "days"]; 
	if (checkRequiredColumns(req.body,requiredColumns)) {
        carpoolModel.createCarpool(req.body.user_id, req.body.lat, req.body.lng, req.body.arrival, req.body.departure, req.body.days, function(result) {
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