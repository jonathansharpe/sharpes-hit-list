const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGODB_URI } = process.env;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (!client.isConnected) {
    await client.connect();
  }

  cachedClient = client;
  return client;
}

module.exports = {
  connectToDatabase,
};

