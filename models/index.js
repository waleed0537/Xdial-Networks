const sequelize = require('../database');
const ClientData = require('./Client.cjs');
const Integration = require('./integration.cjs');

module.exports = {
  sequelize,
  ClientData,
  Integration
};