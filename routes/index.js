const logger  = require('../lib/logger');
const ai      = require('../ai/core');
const express = require('express');
const router  = express.Router();

// Handle POST request to '/start'
router.post('//start', start);
router.post('/start', start);

function start(req, res) {
    res.json({
        color           : "#6A6676",
        secondary_color : "#807D8B",
        name            : "Leech Snek",
        taunt           : "Good luck, have fun!",
        head_type       : "sand-worm",
        tail_type       : "block-bum"
    });
}

// Handle POST request to '/move'
router.post('//move', move);
router.post('/move', move);

function move(req, res) {
    let move, taunt;
    try {
        [move, taunt] = ai.move(req.body);
    } catch(err) {
        logger.log({ error : err });
        console.log(err);
    }
    res.json({
        move  : move  || 'left',
        taunt : taunt || 'I crashed >_<',
    });
}

// Get logs
router.get('/logs', (req, res) =>
    res.json(logger.getLogs())
);

// clear logs
router.get('/clear', (req, res) =>
    res.json(logger.clear())
);

module.exports = router;
