var utils = require('./utils.js'); // do this to call functions in other file
var repository = require('../repository');
var Promise = require('bluebird');
var async = require('async');

loopForAsynchronousInsertInMongoDB();

// not async way - dont do this !
function loopForInsertInMongoDB() {
    for (var i = 0; i < 5; i++) {
        fillCollection(i);
    }
}

// Asynchronous way - Do this way

function loopForAsynchronousInsertInMongoDB() {

    // promise while pattern function:
    var promiseWhile = function (condition, action) {
        var resolver = Promise.defer();

        var loop = function () {
            if (!condition()) return resolver.resolve();
            return Promise.cast(action())
                .then(loop)
                .catch(resolver.reject);
        };

        process.nextTick(loop);

        return resolver.promise;
    };

    var current = 0;
    var stop = 50;

    promiseWhile(function () {
        // Condition for stopping
        return current < stop;
    }, function () {
        // Action to run, should return a promise
        return new Promise(function (resolve, reject) {

            var count = 0;

            async.whilst(
                function ()
                { return count < 1; },
                function (callback) {
                  
                    fillCollection(current);
                    count++;
                    current++;

                    setTimeout(callback, 500); // better minimum 500 for timeOut so things go smooth
                },
                function (err) {
                    resolve();
                }
            );
            

        })

    }).then(function () {

        console.log('');
        console.log('here will execute another thing after the previous loop');

    }).then(function () {

        console.log('');
        console.log('you can chain over and over adding another \'then\'. they will be executed after the previous then ');
        console.log('this will be the FINAL line ');

    })

}


function fillCollection(number) {
    var data = {
        cenas: number
    };
    repository.fillNewEnergyData(data);
}

