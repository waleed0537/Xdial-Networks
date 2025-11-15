const { Sequelize } = require('sequelize');

// Paste your Neon connection string here
const DATABASE_URL = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_oPLd83MiBtVC@ep-small-butterfly-adoor2gd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate()
  .then(() => console.log('✅ Connected to PostgreSQL - xDial database'))
  .catch(err => console.error('❌ PostgreSQL connection error:', err));

module.exports = sequelize;