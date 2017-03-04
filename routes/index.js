const logger  = require('../lib/logger');
const ai      = require('../ai/core');
const express = require('express');
const router  = express.Router();

// Handle POST request to '/start'
router.post('//start', start);
router.post('/start', start);

function start(req, res) {
    res.json({
        color    : "#DFFF00",
        name     : "Leech Snek",
        head_url : "http://www.placecage.com/c/200/200", // optional, but encouraged!
        taunt    : "Let's do thisss thang!",             // optional, but encouraged!
    });
}

// Handle POST request to '/move'
router.post('//move', move);
router.post('/move', move);

function move(req, res) {
    let move;
    try {
        move = ai.move(req.body);
    } catch(err) {
        logger.log(JSON.stringify(err));
        console.log(err);
    }
    res.json({
        move  :  move || 'left',        // one of: ['up','down','left','right']
        taunt : 'Outta my way, snake!', // optional, but encouraged!
    });
    logger.log({
        request : req.body,
        move    : move || 'left'
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
