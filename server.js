// ============================================================================
// xDial Integration Backend - Updated Server
// ============================================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ============================================================================
// Middleware Configuration
// ============================================================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// MongoDB Connection
// ============================================================================

const MONGODB_URI = 'mongodb+srv://hrmsmongo:YWCuBGMkletJv65z@cluster0.hrtxh.mongodb.net/xDial';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB - xDial database'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ============================================================================
// MongoDB Schema & Model Definition
// ============================================================================

const integrationSchema = new mongoose.Schema({
  // Campaign Configuration
  campaign: {
    type: String,
    required: true,
    enum: ['Medicare', 'Final Expense', 'MVA', 'Auto Insurance', 'Auto Warranty'],
    trim: true
  },
  model: {
    type: String,
    required: true,
    enum: ['Basic', 'Advanced'],
    trim: true
  },
  numberOfBots: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  transferSettings: {
    type: String,
    required: true,
    enum: ['high-quality', 'balanced', 'broader', 'balanced-broad', 'balanced-qualified'],
    trim: true
  },
  
  // Integration Settings
  setupType: {
    type: String,
    enum: ['same', 'separate'],
    required: true,
    default: 'same'
  },
  
  // Primary Dialler Settings
  primaryIpValidation: {
    type: String,
    required: true,
    trim: true
  },
  primaryAdminLink: {
    type: String,
    required: true,
    trim: true
  },
  primaryUser: {
    type: String,
    required: true,
    trim: true
  },
  primaryPassword: {
    type: String,
    required: true,
    trim: true
  },
  primaryBotsCampaign: {
    type: String,
    required: true,
    trim: true
  },
  primaryUserSeries: {
    type: String,
    required: true,
    trim: true
  },
  primaryPort: {
    type: String,
    default: '5060',
    trim: true
  },
  
  // Closer Dialler Settings (for separate setup)
  closerIpValidation: {
    type: String,
    trim: true,
    required: function() {
      return this.setupType === 'separate';
    }
  },
  closerAdminLink: {
    type: String,
    trim: true,
    required: function() {
      return this.setupType === 'separate';
    }
  },
  closerUser: {
    type: String,
    trim: true,
    required: function() {
      return this.setupType === 'separate';
    }
  },
  closerPassword: {
    type: String,
    trim: true,
    required: function() {
      return this.setupType === 'separate';
    }
  },
  closerCampaign: {
    type: String,
    trim: true,
    required: function() {
      return this.setupType === 'separate';
    }
  },
  closerIngroup: {
    type: String,
    trim: true,
    required: function() {
      return this.setupType === 'separate';
    }
  },
  closerPort: {
    type: String,
    default: '5060',
    trim: true
  },
  
  // Contact Info
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  
  // Custom Requirements
  customRequirements: {
    type: String,
    trim: true,
    default: ''
  },
  
  // Metadata
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updatedAt timestamp before saving
integrationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for faster queries
integrationSchema.index({ email: 1 });
integrationSchema.index({ companyName: 1 });
integrationSchema.index({ campaign: 1 });
integrationSchema.index({ status: 1 });
integrationSchema.index({ submittedAt: -1 });

const Integration = mongoose.model('Integration', integrationSchema);

// ============================================================================
// CORS Configuration
// ============================================================================

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'https://xdial-networks-frontend.onrender.com',
      'https://xdialnetworks.com',
      'https://www.xdialnetworks.com',
      'http://localhost:5173',
      'http://localhost:5000',
      'http://localhost:3000'
    ];
    
    // Check if the origin is in the allowed list or if it's a subdomain
    if (allowedOrigins.indexOf(origin) !== -1 || 
        origin.endsWith('.onrender.com') ||
        origin.endsWith('.xdialnetworks.com')) {
      callback(null, true);
    } else {
      callback(null, true); // For development, allow all origins
      // In production, use: callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Additional CORS header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// ============================================================================
// API Routes
// ============================================================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Submit Integration Request
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
      contactPerson,
      email,
      phone,
      customRequirements
    } = req.body;

    // Validate campaign and model combination
    const validCombinations = {
      'Medicare': ['Basic', 'Advanced'],
      'Final Expense': ['Basic', 'Advanced'],
      'MVA': ['Basic'],
      'Auto Insurance': ['Advanced'],
      'Auto Warranty': ['Advanced']
    };

    if (!validCombinations[campaign]?.includes(model)) {
      return res.status(400).json({
        success: false,
        message: `Invalid model "${model}" for campaign "${campaign}". Valid options: ${validCombinations[campaign]?.join(', ')}`
      });
    }

    // Validate transfer settings based on model
    const basicTransfers = ['high-quality', 'balanced', 'broader'];
    const advancedTransfers = ['balanced-broad', 'balanced-qualified'];

    if (model === 'Basic' && !basicTransfers.includes(transferSettings)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transfer settings for Basic model'
      });
    }

    if (model === 'Advanced' && !advancedTransfers.includes(transferSettings)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transfer settings for Advanced model'
      });
    }

    // Validate separate dialler fields if needed
    if (setupType === 'separate') {
      if (!closerIpValidation || !closerAdminLink || !closerUser || 
          !closerPassword || !closerCampaign || !closerIngroup) {
        return res.status(400).json({
          success: false,
          message: 'All closer dialler fields are required for separate setup'
        });
      }
    }

    // Create new integration request
    const integration = new Integration({
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
      primaryPort: primaryPort || '5060',
      closerIpValidation: setupType === 'separate' ? closerIpValidation : undefined,
      closerAdminLink: setupType === 'separate' ? closerAdminLink : undefined,
      closerUser: setupType === 'separate' ? closerUser : undefined,
      closerPassword: setupType === 'separate' ? closerPassword : undefined,
      closerCampaign: setupType === 'separate' ? closerCampaign : undefined,
      closerIngroup: setupType === 'separate' ? closerIngroup : undefined,
      closerPort: setupType === 'separate' ? (closerPort || '5060') : undefined,
      companyName,
      contactPerson,
      email,
      phone,
      customRequirements: customRequirements || ''
    });

    // Save to database
    const savedIntegration = await integration.save();

    res.status(201).json({
      success: true,
      message: 'Integration request submitted successfully',
      data: savedIntegration
    });

  } catch (error) {
    console.error('Error submitting integration request:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
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

// Get All Integration Requests
app.get('/api/integration/all', async (req, res) => {
  try {
    const { status, campaign, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (campaign) query.campaign = campaign;
    
    const skip = (page - 1) * limit;

    const integrations = await Integration.find(query)
      .sort({ submittedAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Integration.countDocuments(query);

    res.json({
      success: true,
      data: integrations,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
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
    const integration = await Integration.findById(req.params.id);

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
    const { status } = req.body;

    if (!['pending', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const integration = await Integration.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration request not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
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

// Delete Integration Request
app.delete('/api/integration/:id', async (req, res) => {
  try {
    const integration = await Integration.findByIdAndDelete(req.params.id);

    if (!integration) {
      return res.status(404).json({
        success: false,
        message: 'Integration request not found'
      });
    }

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

// ============================================================================
// Start Server
// ============================================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Submit form: POST http://localhost:${PORT}/api/integration/submit`);
});