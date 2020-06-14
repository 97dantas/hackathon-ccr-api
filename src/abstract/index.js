const axios = require('axios');
const { clientConnect } = require('../db')

const url = 'mongodb://localhost:27017/ccr-dev'

/**
 * @function
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} options - Options mensagem filtrada para objeto de retorno.
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */

exports.findAll = async (collection, query, options = {}) => {
    let conn = null
    try {
       console.log("ENTROU")
        conn = await clientConnect(url)
       console.log("CONEC")
        console.log(conn)
        const result = await conn.db().collection(collection).find(query, options).toArray()
        conn.close()
        return result
    } catch (err) {
        if (conn !== null) conn.close()
        throw new Error(`Error in db: ${err}`)
    }
}

/**
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} options - Opção de retorno de objeto
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */

exports.findOne = async (collection, query, options = {}) => {
    let conn = null
    try {
        conn = await clientConnect(url)
        const result = await conn.db().collection(collection).findOne(query, options)
        conn.close()
        return result
    } catch (err) {
        if (conn !== null) conn.close()
        throw new Error(`Error in db: ${err}`)
    }
}

/**
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} data - Dados que será inserido no banco de dados.
 * @param  {Object} options - Opção de retorno de objeto
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */
exports.findOneAndUpdate = async (collection, query, data, options = {}) => {
    let conn = null
    try {
        conn = await clientConnect(url)
        const result = await conn.db().collection(collection).findOneAndUpdate(query, {$set: data}, options)
        conn.close()
        return result
    } catch (err) {
        if (conn !== null) conn.close()
        throw new Error(`Error in db: ${err}`)
    }
}

/**
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} data - Dados que será inserido no banco de dados.
 * @returns {Promise} Result - resultado da inserção ou stack de new Error()
 */

exports.create = async (collection, data) => {
    let conn = null
    try {
        conn = await clientConnect(url)
        const result = await conn.db().collection(collection).insertOne(data)
        conn.close()
        return result.ops[0]
    } catch (err) {
        if (conn !== null) conn.close()
        throw new Error(`Error in db: ${err}`)
    }
}

/**
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} data - Dados que será alterado
 * @returns {Promise} Result - resultado do update ou stack de new Error()
 */

exports.update = async (collection, query, data) => {
    let conn = null
    try {
        conn = await clientConnect(url)
        const { result } = await conn.db().collection(collection).updateOne(query, {$set: data})
        conn.close()
        return { result }
    } catch (err) {
        if (conn !== null) conn.close()
        throw new Error(`Error in db: ${err}`)
    }
}

/**
 * @param  {String} collection - O nome da colection que irá buscar no banco de dados
 * @param  {Array} query - Query inserida na pesquisa do banco de dados.
 * @returns {Promise} Result - resultado do update ou stack de new Error()
 */

exports.aggregate = async (collection, query) => {
    let conn = null
    try {
        conn = await clientConnect(url)
        const { result } = await conn.db().collection(collection).aggregate(query)
        conn.close()
        return { result }
    } catch (err) {
        if (conn !== null) conn.close()
        throw new Error(`Error in db: ${err}`)
    }
}

exports.findPlate = async (data) => {

    const token = "03AGdBq26PUj_fXFNvmzl88CfBBcexrH3W4C0HC94Pjgr0pJ2ja1wcd1NYjbBAUor90974gZYzA3Mg23TqvkJYFdSqHRb-FYAlPDXmfOr3hdkqHqz-GyUoTI8PQkT3OUqGtSFRWXAImWiJJvLoA_DtTyeJ80X4Mru-gi6y1VrSLFHXebrHIAatw9e4a1NMXcZnRJbUUy5bHp_q8Tc_oScRgUxROrc0OWll7NXMeCa0E6Da9eSZMjgDByZkTiZ6h429jtOt7FUz3mDHxsFwg0XJUjqSiQgf1QivPk-2ZUegAty5ZWvfEc6kVpNJmEvYVW3faGaU4uIW85mdEyqhLDfBGAsGBwZfVRNKSzM6QTR2ZYPOy8TDC7FZu1FfaFWGRpEsaKOds2O_hxEOZi4lNuaIAAvi5pCGHSMXFvXSDfxI5wOa14JccLlOUiu4tIhK9kNvmmnx4gFXAzabg_VGTGy0-mfirg7qU2jBpA"
        try {

            console.log('primeira request')
          const search = await axios({
              method: 'post',
              url: 'https://api.helpay.com.br/v1/vehicle/search',
              data: {
                  plate: 'AIS1332'
                },
              headers: {
                'Authorization': `Bearer ${token}`
                }
            });
           
            console.log ('resultado')
            console.log (search)

          const veicleID = search['data']['id']

          const result = await axios.get(`https://api.helpay.com.br/v1/checkout/${veicleID}/vehicle/debts`,{
              headers: {
                  'Authorization': `Bearer ${token}`
                }
            }
          )

          console.log('solicitacao das apis')
          console.log(result);
          return { result }
        } catch (err) {
            throw new Error(`Error in request: ${err}`)
        }
}