//Exported functions to outside the module.
module.exports = {

    /*  print: function (data) {
     console.log(data);

     },*/

    sumAndDoSomethingElse: function (array, doSomething, doAnotherThingMore) {
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += array[i];
            doSomething(sum);
        }

        doAnotherThingMore(sum);
    }

};

