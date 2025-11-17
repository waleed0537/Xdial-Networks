// ============================================================================
// xDial Integration Backend - PostgreSQL Version
// ============================================================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Import database and model
const { sequelize, Client, Integration } = require('./models');


// ============================================================================
// Middleware Configuration
// ============================================================================

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// Initialize Database
// ============================================================================

// Sync database (creates tables if they don't exist)
// Initialize Database
sequelize.sync({ alter: false })  // Use alter to add foreign key constraint
  .then(() => console.log('✅ Database synchronized'))
  .catch(err => console.error('❌ Database sync error:', err));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ============================================================================
// CORS Configuration
// ============================================================================

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://xdial-networks-frontend.onrender.com',
      'https://xdialnetworks.com',
      'https://www.xdialnetworks.com',
      'http://localhost:5173',
      'http://localhost:5000',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || 
        origin.endsWith('.onrender.com') ||
        origin.endsWith('.xdialnetworks.com')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// ============================================================================
// API Routes
// ============================================================================

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      database: 'Connected'
    });
  } catch (error) {
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      database: 'Disconnected'
    });
  }
});

// Submit Integration Request (Client-facing form)
app.post('/api/integration/submit', async (req, res) => {
  try {
    const {
      campaign,
      model,
      numberOfBots,
      transferSettings,
      setupType,
      primaryIpValidation,
      primaryAdminLink,
      primaryUser,
      primaryPassword,
      primaryBotsCampaign,
      primaryUserSeries,
      primaryPort,
      closerIpValidation,
      closerAdminLink,
      closerUser,
      closerPassword,
      closerCampaign,
      closerIngroup,
      closerPort,
      companyName,
      customRequirements,
      clientsdata_id  // Add this
    } = req.body;

  const validCombinations = {
  'Medicare': ['Advanced', 'Basic'],
  'Auto Insurance': ['Advanced', 'Basic'],
  'MVA': ['Basic'],
  'ACA': ['Basic'],
  'Final Expense': ['Advanced', 'Basic'],
  'Home': ['Basic'],
  'Auto Warranty': ['Advanced'],
  'Medalert': ['Advanced']
};

// Validate campaign exists FIRST
if (!validCombinations[campaign]) {
  return res.status(400).json({
    success: false,
    message: `Invalid campaign "${campaign}"`
  });
}

// Now validate model
if (!model || !validCombinations[campaign].includes(model)) {
  return res.status(400).json({
    success: false,
    message: `Invalid model "${model}" for campaign "${campaign}". Valid options: ${validCombinations[campaign].join(', ')}`
  });
}

// Validate transfer settings
const validTransfers = ['quality', 'balanced', 'high-volume', 'max-volume'];
if (!validTransfers.includes(transferSettings)) {
  return res.status(400).json({
    success: false,
    message: 'Invalid transfer settings'
  });
}

// Validate separate dialler if needed
if (setupType === 'separate') {
  if (!closerIpValidation || !closerAdminLink || !closerUser || 
      !closerPassword || !closerCampaign || !closerIngroup) {
    return res.status(400).json({
      success: false,
      message: 'All closer dialler fields are required for separate setup'
    });
  }
}

    const integration = await Integration.create({
      campaign,
      model,
      numberOfBots,
      transferSettings,
      client_id: null,
      clientsdata_id: clientsdata_id || null,  // Add this
      extensions: [],
      serverIPs: [],
      dialplan: '',
      setupType,
      primaryIpValidation,
      primaryAdminLink,
      primaryUser,
      primaryPassword,
      primaryBotsCampaign: primaryBotsCampaign || '',
      primaryUserSeries: primaryUserSeries || '',
      primaryPort: primaryPort || '5060',
      closerIpValidation: setupType === 'separate' ? closerIpValidation : '',
      closerAdminLink: setupType === 'separate' ? closerAdminLink : '',
      closerUser: setupType === 'separate' ? closerUser : '',
      closerPassword: setupType === 'separate' ? closerPassword : '',
      closerCampaign: setupType === 'separate' ? closerCampaign : '',
      closerIngroup: setupType === 'separate' ? closerIngroup : '',
      closerPort: setupType === 'separate' ? (closerPort || '5060') : '5060',
      companyName,
      customRequirements: customRequirements || '',
      completionRequirements: {
        longScript: false,
        clientDashboard: false,
        disposition: false
      },
      campaignResources: {
        longScript: '',
        clientDashboard: '',
        disposition: ''
      },
      clientAccessEnabled: false,
      startDate: null,
      endDate: null
    });

    res.status(201).json({
      success: true,
      message: 'Integration request submitted successfully',
      data: integration
    });

  } catch (error) {
    console.error('Error submitting integration request:', error);
    
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit integration request',
      error: error.message
    });
  }
});

// Get All Integration Requests (Admin)
app.get('/api/integration/all', async (req, res) => {
  try {
    const { status, campaign, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (campaign) where.campaign = campaign;
    
    const offset = (page - 1) * limit;

    const { count, rows } = await Integration.findAndCountAll({
      where,
      order: [['submittedAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching integration requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch integration requests',
      error: error.message
    });
  }
});

// Get Single Integration Request by ID
app.get('/api/integration/:id', async (req, res) => {
  try {
    const integration = await Integration.findByPk(req.params.id);

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration request not found'
      });
    }

    res.json({
      success: true,
      data: integration
    });

  } catch (error) {
    console.error('Error fetching integration request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch integration request',
      error: error.message
    });
  }
});

// Update Integration Status
app.patch('/api/integration/:id/status', async (req, res) => {
  try {
    const { status, clientAccessEnabled } = req.body;

    if (!['pending', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const integration = await Integration.findByPk(req.params.id);

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration request not found'
      });
    }

    integration.status = status;
    if (clientAccessEnabled !== undefined) {
      integration.clientAccessEnabled = clientAccessEnabled;
    }
    integration.updatedAt = new Date();

    await integration.save();

    res.json({
      success: true,
      message: `Status updated successfully${clientAccessEnabled ? ' and client access enabled' : ''}`,
      data: integration
    });

  } catch (error) {
    console.error('Error updating integration status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message
    });
  }
});

// Update Integration Field (Generic Update) - Admin only
app.patch('/api/integration/:id', async (req, res) => {
  console.log('=== PATCH REQUEST DEBUG ===');
  console.log('Request ID:', req.params.id);
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  
  try {
    const integration = await Integration.findByPk(req.params.id);

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration request not found'
      });
    }

    console.log('Current integration clientsdata_id:', integration.clientsdata_id);

    const allowedFields = [
      'campaign', 'testing', 'model', 'numberOfBots', 'transferSettings',
      'client_id', 'clientsdata_id', 'extensions', 'serverIPs', 'dialplan',
      'setupType', 'primaryIpValidation', 'primaryAdminLink', 'primaryUser',
      'primaryPassword', 'primaryBotsCampaign', 'primaryUserSeries', 'primaryPort',
      'closerIpValidation', 'closerAdminLink', 'closerUser', 'closerPassword',
      'closerCampaign', 'closerIngroup', 'closerPort', 'companyName',
      'customRequirements', 'status', 'clientAccessEnabled', 'startDate', 'endDate'
    ];

    if (req.body.completionRequirements) {
      integration.completionRequirements = {
        ...integration.completionRequirements,
        ...req.body.completionRequirements
      };
      integration.changed('completionRequirements', true);
      delete req.body.completionRequirements;
    }

    if (req.body.campaignResources) {
      integration.campaignResources = {
        ...integration.campaignResources,
        ...req.body.campaignResources
      };
      integration.changed('campaignResources', true);
      delete req.body.campaignResources;
    }

    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        if (key === 'clientsdata_id' || key === 'client_id') {
          const value = req.body[key];
          const parsedValue = value === '' || value === null || value === undefined ? null : parseInt(value);
          console.log(`Setting ${key} from ${value} to ${parsedValue}`);
          integration[key] = parsedValue;
        } else {
          integration[key] = req.body[key];
        }
      }
    });

    integration.updatedAt = new Date();
    
    console.log('About to save with clientsdata_id:', integration.clientsdata_id);
    
    await integration.save();
    await integration.reload();

    console.log('After save clientsdata_id:', integration.clientsdata_id);
    console.log('=== PATCH REQUEST SUCCESS ===');

    res.json({
      success: true,
      message: 'Integration updated successfully',
      data: integration
    });

  } catch (error) {
    console.error('=== PATCH REQUEST ERROR ===');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    console.error('=========================');
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => ({
          field: e.path,
          message: e.message,
          value: e.value
        }))
      });
    }

    if (error.name === 'SequelizeDatabaseError') {
      return res.status(400).json({
        success: false,
        message: 'Database error',
        error: error.message,
        sql: error.sql
      });
    }

    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Foreign key constraint error - the referenced client ID may not exist',
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update integration',
      error: error.message,
      errorName: error.name
    });
  }
});
// Complete Integration (Enable Client Access)
app.patch('/api/integration/:id/complete', async (req, res) => {
  try {
    const integration = await Integration.findByPk(req.params.id);

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration request not found'
      });
    }

    const { completionRequirements } = integration;
    if (!completionRequirements.longScript || 
        !completionRequirements.clientDashboard || 
        !completionRequirements.disposition) {
      return res.status(400).json({
        success: false,
        message: 'All completion requirements must be checked before completing integration'
      });
    }

    if (!integration.clientsdata_id) {
      return res.status(400).json({
        success: false,
        message: 'Client Data ID must be assigned before completing integration'
      });
    }

    if (!integration.extensions || integration.extensions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one extension must be added before completing integration'
      });
    }

    if (!integration.serverIPs || integration.serverIPs.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one server IP must be added before completing integration'
      });
    }

    if (!integration.dialplan || integration.dialplan.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Dialplan must be specified before completing integration'
      });
    }

    integration.status = 'completed';
    integration.clientAccessEnabled = true;
    integration.updatedAt = new Date();
    
    await integration.save();

    res.json({
      success: true,
      message: 'Integration completed successfully. Client access has been enabled.',
      data: integration
    });

  } catch (error) {
    console.error('Error completing integration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete integration',
      error: error.message
    });
  }
});

// Delete Integration Request
app.delete('/api/integration/:id', async (req, res) => {
  try {
    const integration = await Integration.findByPk(req.params.id);

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration request not found'
      });
    }

    await integration.destroy();

    res.json({
      success: true,
      message: 'Integration request deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting integration request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete integration request',
      error: error.message
    });
  }
});

// ============================================================================
// Client Portal Routes
// ============================================================================

// Verify Client Login
app.get('/api/client/verify/:clientsdata_id', async (req, res) => {
  try {
    const { clientsdata_id } = req.params;

    const campaigns = await Integration.findAll({ 
      where: {
        clientsdata_id: clientsdata_id,
        clientAccessEnabled: true
      }
    });

    if (campaigns.length === 0) {
      return res.json({
        success: false,
        message: 'Client not found or access not enabled'
      });
    }

    const clientInfo = {
      companyName: campaigns[0].companyName
    };

    res.json({
      success: true,
      client: clientInfo
    });

  } catch (error) {
    console.error('Error verifying client:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify client',
      error: error.message
    });
  }
});

// Get Client Campaigns
app.get('/api/client/:clientsdata_id/campaigns', async (req, res) => {
  try {
    const { clientsdata_id } = req.params;

    const campaigns = await Integration.findAll({ 
      where: {
        clientsdata_id: clientsdata_id,
        clientAccessEnabled: true
      },
      order: [['submittedAt', 'DESC']]
    });

    if (campaigns.length === 0) {
      return res.json({
        success: true,
        client: null,
        campaigns: []
      });
    }

    const clientInfo = {
      companyName: campaigns[0].companyName
    };

    res.json({
      success: true,
      client: clientInfo,
      campaigns: campaigns
    });

  } catch (error) {
    console.error('Error fetching client campaigns:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaigns',
      error: error.message
    });
  }
});

// ============================================================================
// Error Handling Middleware
// ============================================================================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!', 
    error: err.message 
  });
});


app.get('/api/clientsdata/all', async (req, res) => {
  try {
    const { ClientData } = require('./models');
    const clientsData = await ClientData.findAll({
      order: [['companyName', 'ASC']]
    });

    res.json({
      success: true,
      data: clientsData
    });
  } catch (error) {
    console.error('Error fetching clients data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clients data',
      error: error.message
    });
  }
});

// ============================================================================
// Start Server
// ============================================================================

const PORT = process.env.PORT || 5010;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Submit form: POST http://localhost:${PORT}/api/integration/submit`);
  console.log(`👥 Client portal: GET http://localhost:${PORT}/api/client/:client_id/campaigns`);
}); 