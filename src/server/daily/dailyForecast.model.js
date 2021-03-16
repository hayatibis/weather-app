const { DataTypes } = require('sequelize');


function dailyForecast(sequelize) {
  const attributes = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    // point: { type: DataTypes.GEOMETRY('POINT'), allowNull: false},
    lat: { type: DataTypes.STRING, allowNull: false },
    lon: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.JSON, allowNull: false }
  };

  return sequelize.define('DailyForecast', attributes);
}

module.exports = dailyForecast;
