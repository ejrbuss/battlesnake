const type = require('../lib/type');

function move(req) {

    // Validate request
    type(req.you).assert.string;
    type(req.game_id).assert.string;
    type(req.width).assert.integer;
    type(req.height).assert.integer;
    type(req.turn).assert.integer;
    type(req.food).assert.array;
    type(req.snakes).assert.object;

}

module.exports = { move };