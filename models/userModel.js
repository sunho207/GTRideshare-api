/*
* Handles Database Level Operations for User
* Author: Themiya D. Chandraratna
* Date: 09-03-2018
*/

var db = require('../lib/MySQLConnector');

var userObject = 
{
	id: 0,
	email: null,
	password: null,
	first_name: null,
	last_name: null,
	profile_picture: null
};

var getUser = function(email, password, callback) {
	var statement = "SELECT * FROM common_user WHERE email = '" + email + "' AND password = '" + password + "'";
	db.runSQLStatement(statement, function(result) {
		if (result.length == 0) {
			callback(null);
		} else {
			userObject.id = result[0].idx;
			userObject.email = result[0].email;
			userObject.password = result[0].password;
			userObject.first_name = result[0].first_name;
			userObject.last_name = result[0].last_name;
			userObject.profile_picture = result[0].profile_picture;
			callback(userObject);
		}
	});
}

var createUser = function(email, password, firstName, lastName, callback) {
	var statement = "INSERT INTO common_user (email, password, first_name, last_name, profile_picture) VALUES ( '" + email + "', '" + password + "', '" + firstName + "', '" + lastName + "', 'placeholder')";
	db.runSQLStatement(statement, function(result) {
		if (result != null && result['affectedRows'] != 0) {
			callback(true);
		}
	});
	return false;
}

var getUserById = function(user_id, callback) {
	var statement = "SELECT * FROM common_user WHERE idx =" + user_id + ";";
	db.runSQLStatement(statement, function(result) {
		if (result.length == 0) {
			callback(null);
		} else {
			var user = 
			{
				id : result[0].idx,
				email: result[0].email,
				password: result[0].password,
				first_name: result[0].first_name,
				last_name: result[0].last_name,
				profile_picture: result[0].profile_picture
			};
			callback(user);
		}
	});
}


var updateUser = function(idx, email, password, firstName, lastName, profilePicture, callback) {
	var statement = "UPDATE common_user SET email = " + email + ", password =" + password + ", first_name ="+firstName+", last_name ="+lastName+", profile_picture="+profilePicture+" WHERE idx = "idx";";
	db.runSQLStatement(statement, function(result) {
		if (result != null && result['affectedRows'] != 0) {
			callback(true);
		}
	});
	return false;
}

exports.getUser = getUser;
exports.createUser = createUser;
exports.getUserById = getUserById;