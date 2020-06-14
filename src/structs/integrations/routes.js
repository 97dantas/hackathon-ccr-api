'use strict'

var path = require('path');
var thisModule = path.dirname(__filename).split( path.sep ).pop();

const { postOne } = require('./controller')

module.exports = function (fastify, opts, done) {

    fastify.post('/' + thisModule, postOne)
    
    done()
   
}