const type = require('../lib/type');

module.exports = {

    print(data, json=true, nonewline=false) {
        if(nonewline) {
            process.stdout.write((type(data).object && json)
                ? JSON.stringify(data)
                : data
            );
        } else {
            console.log((type(data).object && json)
                ? JSON.stringify(data)
                : data
            );
        }
        return data;
    },

    marker() {
        this.print('.', false, true);
    },

    safe(data, point) {
        return !(
            point[0] < 0 ||
            point[1] < 0 ||
            point[0] >= data.width  ||
            point[1] >= data.height ||
            data.snake.some(snake =>
                snake.coords.some(coord =>
                    this.pequal(coord, point)
        )));
    },

    head(snake) {
        return snake.coords[0];
    },

    adjacent(point) {
        return [
            this.left(point),
            this.right(point),
            this.up(point),
            this.down(point)
        ];
    },

    distanceSquared(point1, point2) {
        return ((point1[0] - point2[0]) * (point1[0] - point2[0]))
             + ((point1[1] - point2[1]) * (point1[1] - point2[1]));
    },

    distance(point1, point2) {
        return Math.sqrt(this.distanceSquared(point1, point2));
    },

    pequal(point1, point2) {
        return point1[0] === point2[0] && point1[1] === point2[1];
    },

    // Point modifiers
    left (point) { return [point[0] - 1, point[1]]; },
    right(point) { return [point[0] + 1, point[1]]; },
    up   (point) { return [point[0], point[1] - 1]; },
    down (point) { return [point[0], point[1] + 1]; }


};