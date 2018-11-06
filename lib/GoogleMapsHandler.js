const https = require('https');
var logger = require('./CommonLogger');

var routesKey = "AIzaSyAEE9omJVU1WujADEjXYisfTavHDTLYR34";

/*
* Raw Connection to Google Maps - Route API 
*/
var getMapRoute = function(initialLatitude, initialLongitude, finalLatitude, finalLongitude, callback) { 
    logger.info("Function Call from getMapRoute() inside GoogleMapsHandler", initialLatitude +","+initialLongitude+","+finalLatitude+","+finalLongitude);

    var origin = initialLatitude + "," + initialLongitude;
    var destination = finalLatitude + "," + finalLongitude;

    var routeQuery = "https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+destination+"&key="+routesKey;

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
var getRoute = function(initialLatitude, initialLongitude, finalLatitude, finalLongitude, carpool, length, callback) { 
    getMapRoute(initialLatitude,initialLongitude,finalLatitude,finalLongitude, function(res) {
        var distance = res['routes'][0] != null? res['routes'][0].legs[0].distance.text : null; //distance
        var duration = res['routes'][0] != null? res['routes'][0].legs[0].duration.text : null; //duration
        var startAddress = res['routes'][0] != null? res['routes'][0].legs[0].start_address : null; //start address
        var endAddress = res['routes'][0] != null? res['routes'][0].legs[0].end_address : null; //end address
        var startLocation = res['routes'][0] != null? res['routes'][0].legs[0].start_location : null;
        var endLocation = res['routes'][0] != null? res['routes'][0].legs[0].end_location : null;
        
        var numSteps = res['routes'][0] != null? res['routes'][0].legs[0].steps.length : null; //number of legs
        var steps = res['routes'][0] != null? res['routes'][0].legs[0].steps : null; //raw directions
        var directions = res['routes'][0] != null? res['routes'][0].overview_polyline.points : null;
        // var directions = []; //computed directions
        // for(var i = 0; i < numSteps; i++) {
        //   var legDistance = steps[i].distance.text;
        //   var legTime = steps[i].duration.text;
        //   var encodedPolyline = steps[i].polyline.points; //https://developers.google.com/maps/documentation/utilities/polylineutility
        //   var legText = steps[i].html_instructions;
      
        //   var leg = 
        //   {
        //     text: legText,
        //     distance: legDistance,
        //     time: legTime,
        //     encodedPolyline: encodedPolyline
        //   }
      
        //   directions.push(leg);
        // }

        //form Route
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
                address: endAddress
            },
            distance: distance,
            duration: duration,
            directions: directions
        }

        callback(route, carpool, length);
    });
}

exports.getRoute = getRoute;