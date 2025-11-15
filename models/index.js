const sequelize = require('../database');
const Client = require('./Client');
const Integration = require('./integration');

// Define relationships
Client.hasMany(Integration, {
  foreignKey: 'clientId',
  sourceKey: 'clientId',
  as: 'integrations'
});

Integration.belongsTo(Client, {
  foreignKey: 'clientId',
  targetKey: 'clientId',
  as: 'client'
});

module.exports = {
  sequelize,
  Client,
  Integration
};