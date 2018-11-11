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
	phone_number: null,
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
			userObject.phone_number = result[0].phone_number;
			userObject.profile_picture = result[0].profile_picture;
			callback(userObject);
		}
	});
}

var createUser = function(email, password, firstName, lastName, phone_number, profile_picture, callback) {
	var profile_picture_url = "";
	if (profile_picture != null && profile_picture != "") {
		profile_picture_url = profile_picture;
	} else {
		profile_picture_url = "https://www.r-users.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";
	}
	var statement = "INSERT INTO common_user (email, password, first_name, last_name, profile_picture, phone_number) VALUES ( '" + email + "', '" + password + "', '" + firstName + "', '" + lastName + "', '" + profile_picture_url + "', '" + phone_number + "')";
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
				first_name: result[0].first_name,
				last_name: result[0].last_name,
				phone_number: result[0].phone_number,
				profile_picture: result[0].profile_picture
			};
			callback(user);
		}
	});
}

var updateUser = function(idx, first_name, last_name, phone_number, profile_picture, callback) {
	var Fname = "NULL";
	var Lname = "NULL";
	var Pnumber = "NULL";
	var Ppicture = "NULL";

	if (first_name != null && first_name != "") {
		Fname = "'" + first_name + "'";
	}
	if (last_name != null && last_name != "") {
		Lname = "'" + last_name + "'";
	}
	if (phone_number != null && phone_number != "") {
		Pnumber = phone_number;
	}
	if (profile_picture != null && profile_picture != "") {
		Ppicture = "'" + profile_picture + "'";
	}

	var statement = "UPDATE `common_user` SET `first_name` = IFNull(" + Fname + ", first_name),`last_name` = IFNull(" + Lname + ", last_name),`phone_number` = IFNull(" + Pnumber + ", phone_number),`profile_picture` = IFNull(" + Ppicture + ", profile_picture) WHERE `idx` = '" + idx + "';";
	db.runSQLStatement(statement, function(result) {
		if (result == null) {
			callback(
				{
				fieldCount: 0,
				affectedRows: 0,
				insertId: 0,
				serverStatus: 2,
				warningCount: 0,
				message: '(Rows matched: 0  Changed: 0  Warnings: 0',
				protocol41: true,
				changedRows: 0 
				}
			);
		} else {
			callback(result);
		}
	});

}

exports.getUser = getUser;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;