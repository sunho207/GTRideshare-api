var express = require('express');
var router = express.Router();
var _ = require('underscore');

var db = require('../lib/MySQLConnector');
var userModel = require('../models/userModel');

/*
* Get User - Login Endpoint
*/
router.get('/', function(req, res, next) {
	if (req.query.email != null && req.query.password != null) {
		userModel.getUser(req.query.email, req.query.password, function(result) {
			if (result != null) {
				res.send({user_id: result.id, first_name: result.first_name, last_name: result.last_name, phone_number: result.phone_number, profile_picture: result.profile_picture}); //Ok
			}
			else {
				res.sendStatus(401); //Unauthorized
			}
		});
	} else { //Bad Request
		res.sendStatus(400);
	}
});

/*
* Post User - Register Endpoint
*/ 
router.post('/', function(req, res, next) {
	console.log(req.body)
	var requiredColumns = ["email","password", "first_name", "last_name", "phone_number", "profile_picture"]; 
	if (checkRequiredColumns(req.body, requiredColumns)) {
		var statement = "SELECT COUNT(*) as user_count FROM common_user WHERE email = '" + req.body.email + "'";
		db.runSQLStatement(statement, function(result) {
			if (result[0].user_count > 0) {
				res.sendStatus(409); //Conflict 
			}
		});
		userModel.createUser(req.body.email, req.body.password, req.body.first_name, req.body.last_name, req.body.phone_number, req.body.profile_picture, function(result) {
			if (result) {
				res.sendStatus(200); //Ok
			}
		});
	} else { //Bad Request
		res.sendStatus(400);
	}
});

/*
* Put User - Update Profile Endpoint
*/
router.put('/', function(req, res, next) {
	var requiredColumns = ["idx", "first_name", "last_name", "phone_number", "profile_picture"]; 
	if (checkRequiredColumns(req.body, requiredColumns) && req.body.idx != "") {
		userModel.updateUser(req.body.idx, req.body.first_name, req.body.last_name, req.body.phone_number, req.body.profile_picture, function(result) {
			if (result.changedRows != 0) {
				userModel.getUserById(req.body.idx, function(result) {
					res.send(result); //Ok
				})
			}
			else {
				res.sendStatus(304); //Not Modified
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
