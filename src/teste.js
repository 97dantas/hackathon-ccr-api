const axios = require('axios');


  async function getUser() {
    try {
      const response = await axios.get('https://app.qualp.com.br/roteirizador',
      {
        params: {
            json: {"login_cod":null,"waypoints":["São Paulo","Ilhéus / Bahia"],"config_rota":{"volta":false,"costing":"truck","directions_options":{"units":"km","language":"pt-BR","directions_type":"maneuvers","narrative":true}},"config_veiculo":{"categoria":"truck","eixos":6},"config_pedagio":{"prices_from_date":""}}
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  getUser()