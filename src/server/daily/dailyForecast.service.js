const mysql = require('../_helpers/db');

module.exports = {
  getAll,
  getByCoord,
  persist
};

async function getAll() {
  const forecast = await mysql.DailyForecast.findAll();
  if (!forecast) {
    return { message: 'Forecast information not found' };
  }
  return forecast;
}

async function getByCoord(lat, lon) {
  const forecast = await mysql.DailyForecast.findOne({ where: { lat, lon }, order: [ [ 'createdAt', 'DESC' ]]});
  if (!forecast) {
    return { message: 'Forecast information not found' };
  }
  return forecast;
}

async function persist(information) {
  const myDataFormat = {};
  myDataFormat.lat = information.lat;
  myDataFormat.lon = information.lon;
  myDataFormat.data = information;

  // save daily forecast information
  await mysql.DailyForecast.bulkCreate([myDataFormat], {ignoreDuplicates: true});
}
