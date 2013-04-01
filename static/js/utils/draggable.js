define([], function() {
    var draggable = document.getElementsByClassName('draggable'),
        i, position, c;

    for (i = 0;i < draggable.length;i++) {
        c = draggable[i];
        c.addEventListener('mousedown', startDrag(c), false);
        c.addEventListener('mousemove', placeDrag(c), false);
        c.addEventListener('mouseup', stopDrag(c), false);
    }

    function startDrag(item) {
        return function(e) {
            if (!item.position) {
                item.position = {
                    ix: parseInt(item.style.left, 10) || 0,
                    iy: parseInt(item.style.top, 10) || 0,
                    x: e.screenX,
                    y: e.screenY
                };
            }
        };
    }
    function placeDrag(item) {
        return function(e) {
            var sx, sy;
            if (item.position) {
                sx = e.screenX - item.position.x;
                sy = e.screenY - item.position.y;
                item.style.left = item.position.ix + sx + 'px';
                item.style.top = item.position.iy + sy + 'px';
            }
        };
    }
    function stopDrag(item) {
        return function(e) {
            item.position = null;   
        };
    }
});
