const sequelize = require('../database');
const Client = require('./Client');
const ClientData = require('./ClientData');
const Integration = require('./integration');

// Client -> ClientData relationship
Client.hasMany(ClientData, {
  foreignKey: 'client_id',
  sourceKey: 'client_id',
  as: 'clientsData'
});

ClientData.belongsTo(Client, {
  foreignKey: 'client_id',
  targetKey: 'client_id',
  as: 'client'
});

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
  Client,
  ClientData,
  Integration
};