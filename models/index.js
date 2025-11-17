const sequelize = require('../database');
const Client = require('./Client');
const Integration = require('./integration');

Client.hasMany(Integration, {
  foreignKey: 'client_id',
  sourceKey: 'client_id',
  as: 'integrations'
});

Integration.belongsTo(Client, {
  foreignKey: 'client_id',
  targetKey: 'client_id',
  as: 'client'
});

module.exports = {
  sequelize,
  Client,
  Integration
};