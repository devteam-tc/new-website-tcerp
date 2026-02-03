const fs = require('fs');
const path = require('path');

// Read the main JSON file
const industryData = require('../data/IndustryDetails.json');

// Create the industries directory if it doesn't exist
const industriesDir = path.join(__dirname, '../data/industries');
if (!fs.existsSync(industriesDir)) {
    fs.mkdirSync(industriesDir, { recursive: true });
}

// Split and save each industry data into separate files
Object.entries(industryData).forEach(([industry, data]) => {
    const filePath = path.join(industriesDir, `${industry}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Created ${filePath}`);
});

console.log('Industry data split complete!');