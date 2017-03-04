const request = require('request');
const expect  = require('chai').expect ;
const app     = require('../index.js');

describe('battle-snek server', function() {
    it('should return 404', function (done) {
        request.get('http://localhost:9001', (err, res, body) => {
            expect(res.statusCode).to.equal(404);
            expect(JSON.parse(res.body)).to.include.keys('status', 'error');
            done();
        });
    });
    it('should respond to /start', function(done) {
        request.post('http://localhost:9001/start', (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            expect(JSON.parse(res.body)).to.include.keys('color', 'name');
            done();
        });
    });
    it('should respond to /move', function(done) {
        request.post('http://localhost:9001/move',{ "json" : require('./request') }, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.include.keys('move');
            done();
        });
    });
    it('should respond to /log', function(done) {
        request.get('http://localhost:9001/logs', (err, res, body) => {
            console.log(JSON.stringify(res.body, null, 4));
            done();
        });
    })
});
