require('saslprep')

const { MongoClient } = require('mongodb')

/**
 * @returns {Proimise} Connect - Retornando conexão de banco de dados.
 */
exports.clientConnect = (uri) => MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })