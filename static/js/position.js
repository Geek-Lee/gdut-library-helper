(function() {
    var books = document.getElementsByClassName('book'),
        i;

    for (i = 0;i < books.length;i++) {
        assignDataAttributes(books[i]);
    }

    function assignDataAttributes(book) {
        var i, cur;
        for (i = 0;i < book.attributes.length;i++) {
            cur = book.attributes[i];

            if (cur.name == 'data-x') {
                book.style.left = cur.value + 'px';
            }
            if (cur.name == 'data-y') {
                book.style.top = cur.value + 'px';
            }
            if (cur.name == 'data-z') {
                book.style.zIndex = cur.value;
            }
            if (cur.name == 'data-width') {
                book.style.width = cur.value + 'px';
            }
            if (cur.name == 'data-height') {
                book.style.height = cur.value + 'px';
            }
            if (cur.name == 'data-color') {
                book.style.borderColor = cur.value;
                /* TODO set .book:after color */
            }
        }
    }
})();
