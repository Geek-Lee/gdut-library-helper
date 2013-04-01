define([], function() {
    var r = function(base) { return Math.random() * base; },
        default_values = {
        left: r,
        top: r,
        zIndex: -1000
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
            item.style.left = default_values.left(800) + 'px';
        }
        if (item.style.top === '') {
            item.style.top = default_values.top(600) + 'px';
        }
    };

    return assign;
});
