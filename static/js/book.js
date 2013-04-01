require.config({
    shim: {
        underscore: {
            exports: '_'
        }
    },
    paths: {
        underscore: 'libs/underscore/underscore',
        data_attributes: 'utils/da',
        draggable: 'utils/draggable'
    }
});

var require_packages = ['underscore', 'data_attributes', 'draggable'];

require(require_packages, function(_, da, draggable) {
    var books = document.getElementsByClassName('book');

    _.each(books, da);

    return {
        books: books
    };
});
