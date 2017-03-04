const logger  = require('../lib/logger');
const ai      = require('../ai/core');
const express = require('express');
const router  = express.Router();

// Handle POST request to '/start'
router.post('/start', (req, res) =>
    res.json({
        color    : "#DFFF00",
        name     : "Snek",
        head_url : "http://www.placecage.com/c/200/200", // optional, but encouraged!
        taunt    : "Let's do thisss thang!",             // optional, but encouraged!
    })
);

// Handle POST request to '/move'
router.post('/move', (req, res) => {
    logger.log(req);
    let move;
    try {
        move = ai.move(req.body);
    } catch(err) {
        console.log(err);
    }
    res.json({
        move  :  move || 'left',        // one of: ['up','down','left','right']
        taunt : 'Outta my way, snake!', // optional, but encouraged!
    })
});

// Get logs
router.get('/logs', (req, res) =>
    res.json(logger.getLogs())
);

module.exports = router;
