// integration.js - ADD the clientsdata_id field reference at the top with client_id
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Integration = sequelize.define('Integration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  campaign: {
    type: DataTypes.STRING,
    allowNull: false
  },
  testing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numberOfBots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  transferSettings: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'client_id',
    references: {
      model: 'clients',
      key: 'client_id'
    }
  },
  clientsdata_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'clientsdata_id',
    references: {
      model: 'clientsData',
      key: 'id'
    }
  },
  extensions: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  serverIPs: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  dialplan: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  completionRequirements: {
    type: DataTypes.JSONB,
    defaultValue: {
      longScript: false,
      clientDashboard: false,
      disposition: false
    }
  },
  campaignResources: {
    type: DataTypes.JSONB,
    defaultValue: {
      longScript: '',
      clientDashboard: '',
      disposition: ''
    }
  },
  setupType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'same'
  },
  primaryIpValidation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  primaryAdminLink: {
    type: DataTypes.STRING,
    allowNull: false
  },
  primaryUser: {
    type: DataTypes.STRING,
    allowNull: false
  },
  primaryPassword: {
    type: DataTypes.STRING,
    allowNull: false
  },
  primaryBotsCampaign: {
    type: DataTypes.STRING,
    allowNull: true
  },
  primaryUserSeries: {
    type: DataTypes.STRING,
    allowNull: true
  },
  primaryPort: {
    type: DataTypes.STRING,
    defaultValue: '5060'
  },
  closerIpValidation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  closerAdminLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  closerUser: {
    type: DataTypes.STRING,
    allowNull: true
  },
  closerPassword: {
    type: DataTypes.STRING,
    allowNull: true
  },
  closerCampaign: {
    type: DataTypes.STRING,
    allowNull: true
  },
  closerIngroup: {
    type: DataTypes.STRING,
    allowNull: true
  },
  closerPort: {
    type: DataTypes.STRING,
    defaultValue: '5060'
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customRequirements: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  clientAccessEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'integrations',
  timestamps: true
});

module.exports = Integration;