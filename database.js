const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('xlite', 'admin', 'admin8686', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// connect to admin dashboard
const adminSequelize = new Sequelize('postgresql://admindashboard:admin@localhost/admindashboard', {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = {
  sequelize,
  adminSequelize
};