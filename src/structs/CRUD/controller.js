const Boom = require('boom')

var path = require('path');
var thisModule = path.dirname(__filename).split( path.sep ).pop();

const { ObjectID } = require('mongodb')

const { create, findOne, findAll, findOneAndUpdate} = require('../../abstract')

exports.getOne = async (req, res) => {
    try {
        const id = new ObjectID(req.params.id)
        const result = await findOne(thisModule, { _id: id })
        
        if(!result){ 
            return({ message: thisModule + ' not found', code: 200 })}
        return(result)
    
    } catch (err) {
        throw Boom.badRequest(err)
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await findAll(thisModule, {})
        if(!result){ return ({ message: thisModule + ' not found', code: 200 })}
        return (result)
    
    } catch (err) {
        throw Boom.badRequest(err)
    }
}

exports.delOne = async (req, res) => {
    try {
        const id = new ObjectID(req.params.id)

        await findOneAndUpdate(thisModule, { _id: id }, {'deleted': true})
        
        return({ message: thisModule + ' deleted!', code: 200})

    } catch (err) {
        throw Boom.badRequest(err)
    }
}

exports.postOne = async (req, res) => {
    try {
        const data = req.body

        await create(thisModule, data)
        return({ message: thisModule + ' created!', code: 201 })

    } catch (err) {
        throw Boom.badRequest(err)
    }
}

exports.putOne = async (req, res) => {
    try {
        const id = new ObjectID(req.params.id)
        const data = req.body

        await findOneAndUpdate(thisModule, { _id: id }, data)
        
        return({ message: thisModule + ' updated!', code: 200})

    } catch (err) {
        throw Boom.badRequest(err)
    }
}
