define(['underscore', 'text'], function(_, text) {
    var jsonParse = (typeof JSON !== 'undefined' && typeof JSON.parse === 'function')? JSON.parse : function(val){
            return eval('('+ val +')'); //quick and dirty
        },
        name = function(type, year, month) {
            var tmpl = _.template("data/{{ type }}-{{ year }}-{{ month }}.json");
            return tmpl({type: type, year: year, month: month});
        };

    return function(type, year, month, onLoad) {
        text.get(name(type, year, month), function(data) {
            onLoad(jsonParse(data));
        });
    };
});
