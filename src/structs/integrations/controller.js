const Boom = require('boom')

var path = require('path');
var thisModule = path.dirname(__filename).split( path.sep ).pop();

const { ObjectID } = require('mongodb')

const { findPlate} = require('../../abstract')

exports.postOne = async (req, res) => {
    try {
        const data = req.body
        const result = await findPlate(data)
        
        if(!result){ 
            return({ message: thisModule + ' not found', code: 200 })}
        return(result)
    
    } catch (err) {
        throw Boom.badRequest(err)
    }
}
