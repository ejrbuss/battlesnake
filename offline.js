const request = require('request');
const util    = require('./ai/util');

alive = true;
snake = [[0,0], [0,0], [0,0]];
food = [randomPoint(), randomPoint(), randomPoint(), randomPoint(), randomPoint()];


function next(cb) {
    request('http://localhost:9001/move', {
        json : {
            "you": "2c4d4d70-8cca-48e0-ac9d-03ecafca0c98",
            "width": 10,
            "turn": 0,
            "snakes": [{
                "taunt": "git gud",
                "name": "my-snake",
                "id": "2c4d4d70-8cca-48e0-ac9d-03ecafca0c98",
                "health_points": 93,
                "coords": snake,
            }],
            "height": 10,
            "game_id": "a2facef2-b031-44ba-a36c-0859c389ef96",
            "food": food,
        }
    }, (err, res, body) => {
        cb(res.body.move);
    });
}

function move(move) {
    movePoint = util[move](snake[0]);
    if(food.find(point => util.pequal(point, movePoint))) {
        food.remove();
        food.push(randomPoint());
    } else {
        snake.pop();
    }
    snake.unshift(movePoint);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomPoint() {
    return [getRandomInt(0, 10), getRandomInt(0, 10)];
}



