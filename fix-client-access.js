const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://hrmsmongo:YWCuBGMkletJv65z@cluster0.hrtxh.mongodb.net/xDial';

const integrationSchema = new mongoose.Schema({
  clientId: String,
  status: String,
  clientAccessEnabled: Boolean,
  // ... other fields
}, { strict: false });

const Integration = mongoose.model('Integration', integrationSchema);

async function fixClientAccess() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('âœ" Connected to MongoDB');

    // Find all completed campaigns with a client ID but no client access
    const result = await Integration.updateMany(
      { 
        status: 'completed',
        clientId: { $exists: true, $ne: '', $ne: null },
        $or: [
          { clientAccessEnabled: { $exists: false } },
          { clientAccessEnabled: false }
        ]
      },
      { 
        $set: { 
          clientAccessEnabled: true,
          updatedAt: new Date()
        } 
      }
    );

    console.log(`âœ" Updated ${result.modifiedCount} campaigns`);
    console.log(`  - Matched: ${result.matchedCount}`);
    console.log(`  - Modified: ${result.modifiedCount}`);

    // List affected campaigns
    const updatedCampaigns = await Integration.find(
      { 
        status: 'completed',
        clientId: { $exists: true, $ne: '', $ne: null },
        clientAccessEnabled: true
      },
      'clientId companyName campaign model'
    );

    console.log('\nâœ" Client access enabled for:');
    updatedCampaigns.forEach(campaign => {
      console.log(`  - ${campaign.companyName} (ID: ${campaign.clientId}) - ${campaign.campaign} ${campaign.model}`);
    });

    await mongoose.connection.close();
    console.log('\nâœ" Database connection closed');
    process.exit(0);

  } catch (error) {
    console.error('âœ— Error:', error);
    process.exit(1);
  }
}

fixClientAccess();