const type   = require('../lib/type');
const logger = require('../lib/logger');
const util   = require('./util');

function move(req) {
    // Validate request

    logger.log({ status : 'entered core' });

    type(req.you).assert.string;
    type(req.game_id).assert.string;
    type(req.width).assert.integer;
    type(req.height).assert.integer;
    type(req.turn).assert.integer;
    type(req.food).assert.array;
    type(req.snakes).assert.object;

    logger.log({ status : 'passed asserts' });
    let data = setup(req);
    logger.log({ status : 'setup' });
    let goal = next(data);
    logger.log({ status : 'next', goal : goal });
    let step = goto(data, goal);
    logger.log({ status : 'step', step : step });
    let move = todirection(data, step);
    logger.log({ status : 'todirection', move : move });
    return move;
}

function setup(data) {
    data.you  = data.snakes.find(snake => snake.id === data.you);
    data.head = util.head(data.you);
    return data;
}

function next(data) {

    let min  = -1;
    let goal = data.food[0];

    data.food.forEach(point => {

        let d = util.distanceSquared(point, data.head);

        if((min === -1 || d < min)) {
            min  = d;
            goal = point;
        }
    });
    return goal;
}

function goto(data, goal) {

    let adjacent = util.adjacent(util.head(data.you));
    let min      = -1
    let step     = adjacent[0];

    adjacent.forEach(point => {

        let d = util.distanceSquared(point, goal);

        if((min === -1 || d < min) && util.safe(data, point, 128)) {
            min  = d;
            step = point;
        }
        if(min === -1) {
            logger.log({ status : 'found no safe move' });
        }
    });
    return step;
}

function todirection(data, step) {

    if(util.pequal(util.left(data.head), step)) {
        return 'left';
    }
    if(util.pequal(util.right(data.head), step)) {
        return 'right';
    }
    if(util.pequal(util.up(data.head), step)) {
        return 'up';
    }
    if(util.pequal(util.down(data.head), step)) {
        return 'down';
    }
    throw new Error('Could not convert step into a valid move, not adjacent to snake.');
}

module.exports = { move };