const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Integration = sequelize.define('Integration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  
  // Campaign Configuration
  campaign: {
    type: DataTypes.ENUM('Medicare', 'Final Expense', 'MVA', 'Auto Insurance', 'Auto Warranty'),
    allowNull: false
  },
  testing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  model: {
    type: DataTypes.ENUM('Basic', 'Advanced'),
    allowNull: false
  },
  numberOfBots: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 1000
    }
  },
  transferSettings: {
    type: DataTypes.ENUM('high-quality', 'balanced', 'broader', 'balanced-broad', 'balanced-qualified'),
    allowNull: false
  },
  
  // Admin-only Fields
  clientId: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: '',
  references: {
    model: 'clients',  // References the clients table
    key: 'clientId'    // References the clientId column
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'  // If client is deleted, set integration's clientId to NULL
},
  extensions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  serverIPs: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  dialplan: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  
  // Completion Requirements (stored as JSONB)
  completionRequirements: {
    type: DataTypes.JSONB,
    defaultValue: {
      longScript: false,
      clientDashboard: false,
      disposition: false
    }
  },
  
  // Campaign Resources (stored as JSONB)
  campaignResources: {
    type: DataTypes.JSONB,
    defaultValue: {
      longScript: '',
      clientDashboard: '',
      disposition: ''
    }
  },
  
  // Integration Settings
  setupType: {
    type: DataTypes.ENUM('same', 'separate'),
    allowNull: false,
    defaultValue: 'same'
  },
  
  // Primary Dialler Settings
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
  
  // Closer Dialler Settings
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
  
  // Contact Info
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  // Custom Requirements
  customRequirements: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  
  // Metadata
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  
  // Client Access Control
  clientAccessEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
  // Campaign Duration
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
  timestamps: true, // Automatically manages createdAt and updatedAt
  indexes: [
    { fields: ['companyName'] },
    { fields: ['campaign'] },
    { fields: ['status'] },
    { fields: ['submittedAt'] },
    { fields: ['clientId'] },
    { fields: ['endDate'] }
  ]
});

module.exports = Integration;