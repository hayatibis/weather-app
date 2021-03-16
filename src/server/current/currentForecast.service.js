const mysql = require('../_helpers/db');

module.exports = {
  getAll,
  getByCity,
  persist
};

async function getAll() {
  const currentForecast = await mysql.CurrentForecast.findAll();
  if (!currentForecast) {
    return { message: 'currentForecast information not found' };
  }
  return currentForecast;
}

async function getByCity(name) {
  // const currentForecast = await mysql.currentForecast.findByPk(name);
  const currentForecast = await mysql.CurrentForecast.findOne({ where: { name } });
  if (!currentForecast) {
    return { message: 'Forecast information not found' };
  }
  return currentForecast;
}

async function persist(information) {
  console.log(information);

  const myDataFormat = {};
  myDataFormat.id = information.id;
  myDataFormat.name = information.name;
  myDataFormat.data = information;

  await mysql.CurrentForecast.findOne({where: {name: myDataFormat.name}})
  .then((obj) => {
    if(obj) {
      return obj.update(myDataFormat);
    }
    return mysql.CurrentForecast.create(myDataFormat);
  })
}
