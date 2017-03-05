const type   = require('../lib/type');
const logger = require('../lib/logger');
const util   = require('./util');
const taunt  = require('./taunts');

let hopeless;

function move(req) {
    // Validate request

    hopeless = false; // There's still a chance!
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
    return logger.log(hopeless
        ? seppuku(data)
        : move
    );
}

function setup(data) {
    data.you         = data.snakes.find(snake => snake.id === data.you);
    data.otherSnakes = data.snakes.filter(snake => snake.id !== data.you.id);
    data.head        = util.head(data.you);
    return data;
}

function next(data) {

    let min  = -1;
    let goal = data.food[0];
    let d;

    data.food.forEach(point => {

        let d = util.distanceSquared(point, goal);

        if((min === -1 || d < min)) {
            min  = d;
            goal = point;
        }
    });
    return goal;
}

function goto(data, goal) {

    let adjacent = util.adjacent(data.head);
    let min      = -1
    let step     = adjacent[0];

    adjacent.forEach(point => {

        let d = util.distanceSquared(point, goal);
        let context = util.dataCopy(data);

        context.snakes
            .find(snake => snake.id === data.you.id).coords
            .push(point);

        if((min === -1 || d < min) && util.safe(data, point, 512)) {
            min  = d;
            step = point;
        }
    });
    if(min === -1) {
        hopeless = true;
        logger.log({ status : 'hopeless ;_;' });
    }
    return step;
}

function todirection(data, step) {
    if(util.pequal(data.head, step)) {
        return [util.left(data.head), taunt()];
    }
    if(util.pequal(util.left(data.head), step)) {
        return ['left', taunt()];
    }
    if(util.pequal(util.right(data.head), step)) {
        return ['right', taunt()];
    }
    if(util.pequal(util.up(data.head), step)) {
        return ['up', taunt()];
    }
    if(util.pequal(util.down(data.head), step)) {
        return ['down', taunt()];
    }
    throw new Error('Could not convert step into a valid move, not adjacent to snake.');
}

function seppuku(data) {
    return [todirection(data, data.you.coords[1]), 'snekeppuku!'];
}

module.exports = { move };