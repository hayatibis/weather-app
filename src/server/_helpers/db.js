const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const config = require('../config.json');

async function initialize() {
  const { host, port, user, password, database } = config.database.mysql;
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

  // init models and add them to the exported mysqlDb object
  mysqlDb.CurrentForecast = require('../current/currentForecast.model')(sequelize);
  mysqlDb.DailyForecast = require('../daily/dailyForecast.model')(sequelize);

  // sync all models with database
  await sequelize.sync();
}

module.exports = mysqlDb = {};
initialize();
