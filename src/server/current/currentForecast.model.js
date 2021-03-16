const { DataTypes } = require('sequelize');


function currentForecast(sequelize) {
  const attributes = {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.JSON, allowNull: false }
  };

  return sequelize.define('CurrentForecast', attributes);
}

module.exports = currentForecast;
