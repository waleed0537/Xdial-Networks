const sequelize = require('../database');
const ClientData = require('./ClientData');
const Integration = require('./integration');

// ClientData -> Integration relationship
ClientData.hasMany(Integration, {
  foreignKey: 'clientsdata_id',
  sourceKey: 'id',
  as: 'integrations'
});

Integration.belongsTo(ClientData, {
  foreignKey: 'clientsdata_id',
  targetKey: 'id',
  as: 'clientData'
});

module.exports = {
  sequelize,
  ClientData,
  Integration
};