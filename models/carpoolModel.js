/*
* Handles Database Level Operations for Carpools
* Author: Themiya D. Chandraratna
* Date: 09-27-2018
*/

var db = require('../lib/MySQLConnector');
var mapHandler = require('../lib/GoogleMapsHandler');

var createCarpool = function(user_id, lat, lng, arrival, departure, days, callback) {
    var statement = "INSERT INTO carpools (user_id, lat, lng, carpool_arrival, carpool_departure, carpool_days) VALUES ('" + user_id + "', '" + lat + "', '" + lng+ "', '" + arrival + "', '" + departure + "', '" + days + "');";
	db.runSQLStatement(statement, function(result) {
		if (result != null && result['affectedRows'] != 0) {
			callback(true);
		}
	});
	return false;
}

var getStoredCarpools = function(callback) {
    var statement = "SELECT * FROM carpools JOIN common_user WHERE common_user.idx = carpools.user_id;";
	db.runSQLStatement(statement, function(result) {
		if (result.length == 0) {
			callback(null);
		} else {
            var carpools = [];

            for (var i = 0; i < result.length; i++) {
                var carpool =
                {
                    user_id: result[i].user_id,
                    user_email: result[i].email,
                    user_firstname: result[i].first_name,
                    user_lastname: result[i].last_name,
                    user_picture: result[i].profile_picture,
                    lat: result[i].lat,
                    lng: result[i].lng,
                    scheduled_arrival: result[i].carpool_arrival,
                    scheduled_departure: result[i].carpool_departure,
                    scheduled_days: result[i].carpool_days
                }
                carpools.push(carpool);
            }
			callback(carpools);
		}
	});
}

var getAllCarpools = function(user_lat, user_lng, callback) {
    var carpools = [];
    getStoredCarpools(function(carpoolObjects) {
        for (var i = 0; i < carpoolObjects.length; i++) {
            mapHandler.getRoute(user_lat, user_lng, carpoolObjects[i].lat, carpoolObjects[i].lng, carpoolObjects[i], carpoolObjects.length, function(route, carpool, length) {
                var carpool = 
                {
                    user_id: carpool.user_id,
                    user_email: carpool.user_email,
                    user_firstname: carpool.user_firstname,
                    user_lastname: carpool.user_lastname,
                    user_picture: carpool.user_picture,
                    scheduled_arrival: carpool.scheduled_arrival,
                    scheduled_departure: carpool.scheduled_departure,
                    scheduled_days: carpool.scheduled_days,
                    route: route
                };
                carpools.push(carpool);
                if (carpools.length == length) {
                    callback(carpools);
                }
            });
        }
    });
}

exports.createCarpool = createCarpool;
exports.getAllCarpools = getAllCarpools;