'use strict'

var path = require('path');
var thisModule = path.dirname(__filename).split( path.sep ).pop();

const { postOne, getAll, getOne, putOne, delOne } = require('./controller')

module.exports = function (fastify, opts, done) {

    fastify.post('/' + thisModule, postOne)
    
    fastify.get('/' + thisModule, getAll)

    fastify.get('/'+ thisModule + '/:id', getOne)
   
    fastify.put('/'+ thisModule + '/:id', putOne)
    
    fastify.delete('/'+ thisModule + '/:id', delOne)
    done()
   
}