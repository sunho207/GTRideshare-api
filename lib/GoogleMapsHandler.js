const https = require('https');
const _ = require('lodash');
var logger = require('./CommonLogger');

var routesKey = "AIzaSyAEE9omJVU1WujADEjXYisfTavHDTLYR34";
var georgiaTech = {
    lat: '33.7756',
    lng: '-84.3963'
}

/*
* Raw Connection to Google Maps - Route API 
*/
var getMapRoute = function(initialLatitude, initialLongitude, finalLatitude, finalLongitude, waypoints, callback) { 
    var origin = initialLatitude + "," + initialLongitude;
    var destination = finalLatitude + "," + finalLongitude;
    var waypointString = ""
    _.forEach(waypoints, w => {
        waypointString += "|via:" + w.carpooler_lat + "%2C" + w.carpooler_lng
    })
    var routeQuery = "https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+destination+"&waypoints=optimize:true|"+waypointString+"&key="+routesKey;
    let data;
    https.get(routeQuery, (resp) => {
        resp.on('data', function (chunk) {
            data += chunk;
        });
        resp.on('end', function () {
            callback(JSON.parse(data.substring(9, data.length)));
        });
    }).on("error", (err) => {
    });
}

/*
* Route from Origin to Destination 
*/
var getRoute = function(carpool, callback) {
    var initialLatitude = null
    var initialLongitude = null
    var waypoints = []
    _.forEach(carpool.carpoolers, c => {
        if (c.id == carpool.user_id) {
            initialLatitude = c.carpooler_lat
            initialLongitude = c.carpooler_lng
        } else {
            waypoints.push(c)
        }
    })
    getMapRoute(initialLatitude, initialLongitude, georgiaTech.lat, georgiaTech.lng, waypoints, function(res) {
        var distance = res['routes'][0] != null? res['routes'][0].legs[0].distance.text : null; //distance
        var duration = res['routes'][0] != null? res['routes'][0].legs[0].duration.text : null; //duration
        var startAddress = res['routes'][0] != null? res['routes'][0].legs[0].start_address : null; //start address
        // var endAddress = res['routes'][0] != null? res['routes'][0].legs[0].end_address : null; //end address
        var startLocation = res['routes'][0] != null? res['routes'][0].legs[0].start_location : null;
        var endLocation = res['routes'][0] != null? res['routes'][0].legs[0].end_location : null;
        var directions = res['routes'][0] != null? res['routes'][0].overview_polyline.points : null;
        var route = 
        {
            origin: {
                lat: startLocation.lat,
                lng: startLocation.lng,
                address: startAddress
            },
            destination: {
                lat: endLocation.lat,
                lng: endLocation.lng,
                address: "Georgia Tech"
            },
            distance: distance,
            duration: duration,
            directions: directions
        }
        callback(route, carpool);
    });
}

exports.getRoute = getRoute;