define([], function() {
    var default_values = {
        left: 0, top: 0, zIndex: -1000
    }, assign;

    assign = function(item) {
        var i, cur;

        for (i = 0;i < item.attributes.length;i++) {
            cur = item.attributes[i];

            if (cur.name == 'data-x') {
                item.style.left = cur.value + 'px';
            }
            if (cur.name == 'data-y') {
                item.style.top = cur.value + 'px';
            }
            if (cur.name == 'data-z') {
                item.style.zIndex = cur.value;
            }

            if (cur.name == 'data-width') {
                item.style.width = cur.value + 'px';
            }
            if (cur.name == 'data-height') {
                item.style.height = cur.value + 'px';
            }

            if (cur.name == 'data-color') {
                item.style.borderColor = cur.value;
                /* TODO set .item:after color */
            }
        }

        if (item.style.left === '') {
            item.style.left = default_values.left;
        }
        if (item.style.top === '') {
            item.style.top = default_values.top;
        }
    };

    return assign;
});
