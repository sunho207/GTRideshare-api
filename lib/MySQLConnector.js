/*
* MySQL Database Operation Base Code
* Author: Themiya D. Chandraratna
* Date: 09-03-2018
*/

var fs = require('fs');
var mysql = require('promise-mysql');
const path = require('path');

//Retrieve Database Connection Information from database.json
var dir =  path.dirname(__dirname);
var data = fs.readFileSync(dir + '/database.json', 'utf8');
var dbInfo = JSON.parse(data);
var dbCredentials =
{
	host: dbInfo.dev.host,
	user: dbInfo.dev.user,
	password: dbInfo.dev.password,
	database: dbInfo.dev.database
}



// --------- Core Database Handler Methods --------- \\ 
// --------- Core Database Handler Methods --------- \\

/*
* Executes a given SQL statement on the Database
* param: query - SQL statement to execute
* Callback - result after executing statement
*/
var runSQLStatement = function(query, callback) {
	mysql.createConnection(dbCredentials).then(function(conn) {
		var res = conn.query(query); // execute query
		conn.end();

		return res;
	}).then(function(result) {
		callback(result); //callback result from query
	});
}


// --------- End of Helper Database Handler Methods --------- \\
// --------- End of Helper Database Handler Methods --------- \\

//databaseHandler.js Interface
exports.runSQLStatement = runSQLStatement;
exports.connection = dbCredentials;