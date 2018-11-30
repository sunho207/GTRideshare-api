var db = require('../lib/MySQLConnector');

var joinCarpool = function(user_id, carpool_id, user_lat, user_lng, user_address, pending, callback) {
	var statement = "INSERT INTO carpoolers (user_id, carpool_id, user_lat, user_lng, user_address, pending) VALUES ('" +
		user_id + "', '" + carpool_id + "', '" + user_lat + "', '" + user_lng + "', '" + user_address + "', '" + pending + "');";
	db.runSQLStatement(statement, function(result) {
		if (result != null && result['affectedRows'] != 0) {
			callback(true);
		}
	});
	return false;
}

var getCarpoolers = function(carpool_id, callback) {
    var statement = `SELECT * FROM common_users JOIN carpoolers WHERE carpoolers.user_id = common_users.idx AND carpoolers.carpool_id = ${carpool_id}`;
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
					profile_picture: result[i].profile_picture,
					carpooler_lat: result[i].user_lat,
					carpooler_lng: result[i].user_lng,
					address: result[i].user_address
                }
                users.push(user);
            }
			callback(users);
		}
	});
}

exports.joinCarpool = joinCarpool;
exports.getCarpoolers = getCarpoolers;