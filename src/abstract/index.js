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

exports.findPlate = async(data) => {
    try {
      const response = await axios.get('https://app.qualp.com.br/roteirizador',
      {
        params: {
            json: {"login_cod":null,"waypoints": data.waypoints,"config_rota":{"volta":false,"costing":"truck","directions_options":{"units":"km","language":"pt-BR","directions_type":"maneuvers","narrative":true}},"config_veiculo":{"categoria":"truck","eixos":6},"config_pedagio":{"prices_from_date":""}}
        }
      });

      response.data.lugares = [{
        "id": "172",
        "score": 200,
        "nome": "Posto Fase Quatro",
        "latitude": "-23.503036",
        "longitude": "-46.753259",
        "sentido": "norte",
        "km": "14",
        "servicos": "abastecimento. Funcionamento 24 horas.",
        "distFromStart": 12052.517483838956
        },
        {
        "id": "156",
        "score": 240,
        "nome": "Auto Posto Britânia",
        "latitude": "-23.436382",
        "longitude": "-46.785588",
        "sentido": "sul",
        "km": "24",
        "servicos": "abastecimento. Funcionamento 24 horas",
        "distFromStart": 19389.904371681267
        },
        {
        "id": "173",
        "score": 300,
        "nome": "Auto Posto Papai Noel",
        "latitude": "-23.4364066",
        "longitude": "-46.7857216",
        "sentido": "norte",
        "km": "23",
        "servicos": "abastecimento, conveniência, borracharia. Conveniência aberta das 06:00 às 22:00, possuim estacionamento, borracharia aberta das 08:00 às 18:00.",
        "distFromStart": 19397.304742437405
        },
        {
        "id": "189",
        "score": 400,
        "nome": "Posto Campeão",
        "latitude": "-23.39513",
        "longitude": "-46.767717",
        "sentido": "norte",
        "km": "28",
        "servicos": "abastecimento, restaurante, borracharia. Funcionamento das 06:00 às 22:00, borracharia aberta 24 horas, possui estacionamento.",
        "distFromStart": 21924.8347983009
        }]



      console.log(response.data);
      return (response.data)
    } catch (error) {
      console.error(error);
    }

  }