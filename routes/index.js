const ai      = require('../ai/core');
const express = require('express');
const router  = express.Router();

// Handle POST request to '/start'
router.post('/start', (req, res) => {
    ai.start(req);
    // Response data
    return res.json({
        color    : "#DFFF00",
        name     : "Snek",
        head_url : "http://www.placecage.com/c/200/200", // optional, but encouraged!
        taunt    : "Let's do thisss thang!",             // optional, but encouraged!
    });
})

// Handle POST request to '/move'
router.post('/move', (req, res) => {
    res.json({
        move  :  ai.move(req),          // one of: ['up','down','left','right']
        taunt : 'Outta my way, snake!', // optional, but encouraged!
    });
})

module.exports = router;
