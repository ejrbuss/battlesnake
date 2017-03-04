const type = require('../lib/type');

module.exports = {

    print(data, json=true, nonewline=false) {
        if(nonewline) {
            process.stdout.write((type(data).object && json)
                ? JSON.stringify(data, null, 4)
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

    dataCopy(data) {
        return JSON.parse(JSON.stringify(data));
    },

    dataEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    },

    selectRandom(set) {
        return set[Math.floor(Math.random() * set.length)];
    },

    randomMove(point) {
        return this[this.selectRandom(['left', 'right', 'up', 'down'])](point);
    },

    nextBoardHeuristic(data) {
        let next = this.dataCopy(data);
        next.snakes.map(snake => {
            if(snake.id !== data.you.id) {
                snake.coords.shift(this.randomMove(snake.coords[0]));
            }
            return snake;
        });
        return next;
    },

    marker() {
        this.print('.', false, true);
    },

    safe(data, point, depth=1) {
        if(depth === 1) {
            return !(
                point[0] < 0 ||
                point[1] < 0 ||
                point[0] >= data.width  ||
                point[1] >= data.height ||
                data.snakes.some(snake =>
                    snake.coords.some(coord =>
                        this.pequal(coord, point)
            )));
        } else {
            let next = this.nextBoardHeuristic(data);
            depth--;
            return this.safe(data, point) && (
                this.safe(next, this.left(point),  depth) ||
                this.safe(next, this.right(point), depth) ||
                this.safe(next, this.up(point),    depth) ||
                this.safe(next, this.down(point),  depth)
            );
        }
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