require.config({
    shim: {
        underscore: {
            exports: '_'
        }
    },
    paths: {
        text: 'libs/text',
        json: 'libs/json',
        underscore: 'libs/underscore',

        data_attributes: 'utils/da',
        draggable: 'utils/draggable',
        load: 'utils/load',
        loadbooks: 'utils/loadbooks'
    }
});

var require_packages = ['underscore', 'loadbooks'],
    year = 2013, month = 2;

require(require_packages, function(_, loadbooks) {
    var books = document.getElementsByClassName('books')[0];

    loadbooks(year, month, books);

    return {
        books: books
    };
});
