//Imports and global variables.
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url_orionhistory = 'mongodb://10.10.10.202:27017/orion_history';

// production url (non local):
// var url_weather_data = 'mongodb://localhost:27017/weather_data';

// for test locally :
var url_weather_data = 'mongodb://10.10.10.202:27017/weather_data';

var request = require('request');


module.exports = {


//Insert Orion context data into a separate DB to persist the history. Being called by soap_cli.js
    /**
     * created by bd in 25/07/2016
     * @param data
     */
    fillNewEnergyData: function (data) {
        MongoClient.connect(url_orionhistory, function (err, db) {
            assert.equal(null, err);
            db.collection('new_energy_data').insert(data, function (err, result) {
                assert.equal(err, null);
                console.log("Inserted energy readings in new_energy_data db " + result.ops[0].cenas);
                db.close();
            });
        });
    }
        
            
};