/*
* Handles Database Level Operations for Carpools
* Author: Themiya D. Chandraratna
* Date: 09-27-2018
*/

var db = require('../lib/MySQLConnector');
var _ = require('lodash')
var mapHandler = require('../lib/GoogleMapsHandler');
var userModel = require('../models/userModel');
var carpoolerModel = require('../models/carpoolerModel');

var createCarpool = function(user_id, lat, lng, arrival, departure, days, start, end, seats, address, callback) {
    var statement = "INSERT INTO carpools (user_id, lat, lng, carpool_arrival, carpool_departure, carpool_days, start, end, seats ) VALUES ('"
        + user_id + "', '" + lat + "', '" + lng+ "', '" + arrival + "', '" + departure + "', '" + days + "', '" + start + "', '" + end + "', '" + seats + "');";
	db.runSQLStatement(statement, function(result) {
		if (result != null && result['affectedRows'] != 0) {
            carpoolerModel.joinCarpool(user_id, result.insertId, lat, lng, address, 1, function(result) {
                if (result != null && result['affectedRows'] != 0) {
                    callback(true);
                }
            })
		}
	});
	return false;
}

var getStoredCarpools = function(user_lat, user_lng, callback) {
    var statement = "SELECT * FROM carpools";
	db.runSQLStatement(statement, function(result) {
		if (result.length == 0) {
			callback(null);
		} else {
            var carpools = [];
            var payload = [];

            for (var i = 0; i < result.length; i++) {
                carpools.push({
                    carpool_id: result[i].idx,
                    user_id: result[i].user_id,
                    lat: result[i].lat,
                    lng: result[i].lng,
                    scheduled_arrival: result[i].carpool_arrival,
                    scheduled_departure: result[i].carpool_departure,
                    scheduled_days: result[i].carpool_days,
                    start: result[i].start,
                    end: result[i].end,
                    seats: result[i].seats
                });
            }

            _.forEach(carpools, carpool => {
                userModel.getUserById(carpool.user_id, (user) => {
                    carpool.captain = user
                    carpoolerModel.getCarpoolers(carpool.carpool_id, (users) => {
                        users.push({
                            carpooler_lat: user_lat,
                            carpooler_lng: user_lng
                        })
                        carpool.carpoolers = users
                        payload.push(carpool)
                        if (payload.length == result.length) {
                            callback(payload);
                        }
                    })
                })
            })
		}
	});
}

var getAllCarpools = function(user_lat, user_lng, callback) {
    var carpools = [];
    getStoredCarpools(user_lat, user_lng, function(carpoolObjects) {
        for (var i = 0; i < carpoolObjects.length; i++) {
            mapHandler.getRoute(carpoolObjects[i], function(route, carpool) {
                carpool.route = route
                carpools.push(carpool);
                if (carpools.length == carpoolObjects.length) {
                    callback(carpools);
                }
            });
        }
    });
}

var getMyStoredCarpools = function(idx, callback) {
    var statement = `SELECT carpools.* FROM carpools JOIN carpoolers ON carpoolers.carpool_id = carpools.idx AND pending > 0 AND carpoolers.user_id = ${idx};`;
	db.runSQLStatement(statement, function(result) {
		if (result.length == 0) {
			callback(null);
		} else {
            var carpools = [];
            var payload = [];

            for (var i = 0; i < result.length; i++) {
                carpools.push({
                    carpool_id: result[i].idx,
                    user_id: result[i].user_id,
                    lat: result[i].lat,
                    lng: result[i].lng,
                    scheduled_arrival: result[i].carpool_arrival,
                    scheduled_departure: result[i].carpool_departure,
                    scheduled_days: result[i].carpool_days,
                    start: result[i].start,
                    end: result[i].end,
                    seats: result[i].seats
                });
            }

            _.forEach(carpools, carpool => {
                userModel.getUserById(carpool.user_id, (user) => {
                    carpool.captain = user
                    carpoolerModel.getCarpoolers(carpool.carpool_id, (users) => {
                        carpool.carpoolers = users
                        payload.push(carpool)
                        if (payload.length == result.length) {
                            callback(payload);
                        }
                    })
                })
            })
		}
	});
}

var getMyCarpools = function(idx, callback) {
    var carpools = [];
    getMyStoredCarpools(idx, function(carpoolObjects) {
        for (var i = 0; i < carpoolObjects.length; i++) {
            mapHandler.getRoute(carpoolObjects[i], function(route, carpool) {
                carpool.route = route
                carpools.push(carpool);
                if (carpools.length == carpoolObjects.length) {
                    callback(carpools);
                }
            });
        }
    });
}

var getPendingUsers = function(idx, callback) {
    var statement = `SELECT carpools.idx FROM carpools JOIN carpoolers ON carpoolers.carpool_id = carpools.idx AND pending > 0 AND carpoolers.user_id = ${idx};`;
	db.runSQLStatement(statement, function(result) {
		if (result.length == 0) {
			callback([]);
		} else {
            var userList = [];
            var counter = 0;

            _.forEach(result, carpool => {
                carpoolerModel.getPendingCarpoolers(carpool.idx, (users) => {
                    _.forEach(users, user => {
                        userList.push(user)
                    })
                    counter++
                    if (counter == result.length) {
                        callback(userList);
                    }
                })
            })
		}
	});
}

exports.createCarpool = createCarpool;
exports.getAllCarpools = getAllCarpools;
exports.getMyCarpools = getMyCarpools;
exports.getPendingUsers = getPendingUsers;