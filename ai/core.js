const type = require('../lib/type');
const util = require('./util');

function move(req) {
    // Validate request

    type(req.you).assert.string;
    type(req.game_id).assert.string;
    type(req.width).assert.integer;
    type(req.height).assert.integer;
    type(req.turn).assert.integer;
    type(req.food).assert.array;
    type(req.snakes).assert.object;

    util.marker();
    let data = setup(req);
    util.marker();
    let goal = next(data);
    util.marker();
    let step = goto(data, goal);
    util.marker();
    let move = todirection(data, step);
    util.print('done');
    return move;
}

function setup(data) {
    data.you = data.snakes.find(snake => snake.id === data.you);
    return data;
}

function next(data) {
    return [0, 0];
}

function goto(data, goal) {

    let adjacent = util.adjacent(util.head(data.you));
    let min      = util.distanceSquared(adjacent[0], goal);
    let step     = adjacent[0];

    adjacent.forEach(point => {

        let d = util.distanceSquared(point, goal);

        if(d < min && util.safe(data, point)) {
            min  = d;
            step = point;
        }
    });
    return step;
}

function todirection(data, step) {

    let head = util.head(data.you);

    if(util.pequal(util.left(head), step)) {
        return 'left';
    }
    if(util.pequal(util.right(head), step)) {
        return 'right';
    }
    if(util.pequal(util.up(head), step)) {
        return 'up';
    }
    if(util.pequal(util.down(head), step)) {
        return 'down';
    }
    throw new Error('Could not convert step into a valid move, not adjacent to snake.');
}

module.exports = { move };