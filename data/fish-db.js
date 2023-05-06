require('dotenv').config();
const mongoose = require('mongoose');
const ATLAS_USER = process.env.ATLAS_USER;
const ATLAS_PASSWORD = process.env.ATLAS_PASSWORD;

// Connect to MongoDB
const mongoUri = `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@fish-cluster.5td72vb.mongodb.net/fish`;

mongoose.connect(mongoUri).then(() => {
  console.log("Connected to MongoDB Successfully.");
}).catch(error => console.log(error));

// Handle errors and disconnected events after establishment of initial MongoDB connection
mongoose.connection.on('error', err => {
  console.error(`MongoDB connection Error: ${err}`);
});

mongoose.connection.on('disconnected', disc => {
  console.log(`MongoDB Disconnection: ${disc}`);
})

// Set mongoose debugging mode to true
mongoose.set('debug', true);

// Export DB connection to other modules
module.exports = mongoose.connection;
