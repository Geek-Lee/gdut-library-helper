var require_packages = ['underscore', 'load', 'data_attributes', 'draggable',
                        'text!templates/book.html'],
    type = 0;

define(require_packages, function(_, load, da, draggable, bookTmpl) {
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };
    var tmpl = _.template(bookTmpl);

    return function(year, month, parent, onLoad) {
        load(type, year, month, function(data) {
            var books;

            if (data.body) {
                data.body = _.sortBy(data.body, function(e) {
                    return parseInt(e[0], 10);
                }).reverse();
                data.body.length = 5;
                _.each(data.body, function(e, idx) {
                    var book = tmpl({name: e[1], desc: e[0]});
                    parent.insertAdjacentHTML('beforeend', book);
                });

                books = document.getElementsByClassName('book');
                _.each(books, function(e, idx) {
                    da(e);
                    draggable(e);
                });

                if (onLoad)
                    onLoad(data);
            }
        });
    };
});
