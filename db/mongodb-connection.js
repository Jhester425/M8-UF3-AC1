const {MongoClient} = require("mongodb");
const {mongoURI} = require("../config/config.js");

const dbName = 'products';

// create mongoDB client
const client = new MongoClient(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;