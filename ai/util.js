const type = require('../lib/type');

const util = {

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
        return util[util.selectRandom(['left', 'right', 'up', 'down'])](point);
    },

    nextBoardHeuristic(data, selfMove) {
        let next = util.dataCopy(data);
        selfMove = selfMove || util.selectRandom;

        next.snakes.map(snake => {
            snake.id !== data.you.id
                ? snake.coords.unshift(util.randomMove(snake.coords[0]))
                : snake.coords.unshift(selfMove(snake.coords[0]));
            return snake;
        });
        return next;
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
                        util.pequal(coord, point)
            )));
        } else {
            depth--;
            return util.safe(data, point) && (
                util.safe(util.nextBoardHeuristic(data, util.left),  util.left(point),  depth) ||
                util.safe(util.nextBoardHeuristic(data, util.right), util.right(point), depth) ||
                util.safe(util.nextBoardHeuristic(data, util.up),    util.up(point),    depth) ||
                util.safe(util.nextBoardHeuristic(data, util.down),  util.down(point),  depth)
            );
        }
    },

    head(snake) {
        return snake.coords[0];
    },

    adjacent(point) {
        return [
            util.left(point),
            util.right(point),
            util.up(point),
            util.down(point)
        ];
    },

    distanceSquared(point1, point2) {
        return ((point1[0] - point2[0]) * (point1[0] - point2[0]))
             + ((point1[1] - point2[1]) * (point1[1] - point2[1]));
    },

    distance(point1, point2) {
        return Math.sqrt(util.distanceSquared(point1, point2));
    },

    pequal(point1, point2) {
        return point1[0] === point2[0] && point1[1] === point2[1];
    },

    // Point modifiers
    left (point) { return [point[0] - 1, point[1]]; },
    right(point) { return [point[0] + 1, point[1]]; },
    up   (point) { return [point[0], point[1] - 1]; },
    down (point) { return [point[0], point[1] + 1]; },
    center(data) { return [data.width / 2, data.height / 2] }

};

module.exports = util;