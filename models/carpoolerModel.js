var db = require('../lib/MySQLConnector');

var joinCarpool = function(user_id, carpool_id, user_lat, user_lng, callback) {
    var statement = "INSERT INTO carpooler (user_id, carpool_id, user_lat, user_lng) VALUES ('" + user_id + "', '" + carpool_id + "', '" + user_lat + "', '" + user_lng + "');";
	db.runSQLStatement(statement, function(result) {
		if (result != null && result['affectedRows'] != 0) {
			callback(true);
		}
	});
	return false;
}

var getCarpoolers = function(carpool_id, callback) {
    var statement = `SELECT * FROM common_user JOIN carpooler WHERE carpooler.user_id = common_user.idx AND carpooler.carpool_id = ${carpool_id}`;
	db.runSQLStatement(statement, function(result) {
		if (result.length == 0) {
			callback(null);
		} else {
            var users = [];

            for (var i = 0; i < result.length; i++) {
                var user = {
					id : result[i].idx,
					email: result[i].email,
					first_name: result[i].first_name,
					last_name: result[i].last_name,
					phone_number: result[i].phone_number,
					profile_picture: result[i].profile_picture
                }
                users.push(user);
            }
			callback(users);
		}
	});
}

exports.joinCarpool = joinCarpool;
exports.getCarpoolers = getCarpoolers;