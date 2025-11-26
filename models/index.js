const { sequelize, adminSequelize} = require('../database');
const ClientData = require('./Client');
const Integration = require('./integration');

module.exports = {
  sequelize,
  adminSequelize,
  ClientData,
  Integration
};