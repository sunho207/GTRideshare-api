/*
* Interface for MongoDB - Handles Connection with MongoDB
* Version: 1.0
* Date: 9/12/2018
*/

const MongoClient = require('mongodb').MongoClient;

/*
* Creates a connection to MongoDB
* param: connectionDetails (object) - defines the required information to open a connection to the db host
* return: dbConnection (object) - connection to MongoDB
*/
var createConnection = function(connectionDetails) {
    var dbConnection = null;
    return dbConnection;
}

/*
* Retrieves all of the collections from the database in the open connection
* param: dbConnection (object) - connection instance to MongoDB
* return: collections (array) - list of collections 
*/
var getCollections = function(dbConnection) {
    var collections = null; //TODO - list of collections from database
    return collections;
}

/*
* Retrieves data from MongoDB
* param: dbConnection (object) - connection instance to MongoDB
* param: collection (string) - specifies the collection from which to retrieve
* param: query (object) - specifies the search parameters
* return: resultSet (array) - list of data
*/
var dbGet = function(dbConnection, collection, query) {
    var resultSet = null; // dbConnection.find()
    return resultSet;
}

/*
* Inserts data to MongoDB
* param: dbConnection (object) - connection instance to MongoDB
* param: collection (string) - specifies the collection in which to insert
* param: data (object) - specifies the data that should be inserted
* return: responseObject (object) - specifies the status of insert
*/
var dbInsert = function(dbConnection, collection, data) {
    var responseObject =
    {
        isSucess: false,
        insertRecord: null //TODO - should be the identifier for the inserted record(s)
    }
    return responseObject;
}

/*
* Updates data in MongoDB
* param: dbConnection (object) - connection instance to MongoDB
* param: collection (string) - specifies the collection in which to update
* param: data (object) - specifies the data that should be updated
* return: responseObject (object) - specifies the status of update
*/
var dbUpdate = function(dbConnection, collection, data) {
    var responseObject =
    {
        isSucess: false,
        updateRecord: null //TODO - should be the identifier for the updated records(s)
    }
    return responseObject;
}

/*
* Deletes data from MongoDB
* param: dbConnection (object) - connection instance to MongoDB
* param: collection (string) - specifies the collection from which to delete
* param: data (object) - specifies the data that should be deleted
* return: responseObject (object) - specifies the status of delete
*/
var dbDelete = function(dbConnection) {
    var responseObject =
    {
        isSucess: false,
        deleteRecord: null, //TODO - should be the identifier for the deleted records(s)
        deleted: null //TODO - should be the deleted record(s)
    }
    return responseObject;
}


//MongoConnector.js Interface
exports.createConnection = createConnection;
exports.dbGet = dbGet;
exports.dbInsert = dbInsert;
exports.dbUpdate = dbUpdate;
exports.dbDelete = dbDelete;