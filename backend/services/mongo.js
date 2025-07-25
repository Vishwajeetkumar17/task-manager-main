const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection.once('open', () => {
    console.log(`✅ Connected to MongoDB`);
});

mongoose.connection.on('error', (err) => {
    console.error(`❌ Error connecting to MongoDB`, err);
});

async function connectMongo() {
    const uri = process.env.MONGO_URL;
    if (!uri) {
        console.error("❌ MONGO_URL is not defined in the environment variables.");
        process.exit(1);
    }
    await mongoose.connect(uri);
}

module.exports = connectMongo;
