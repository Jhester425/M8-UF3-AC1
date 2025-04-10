// const sql = require("../db/mysql-connection");
const mongoClient = require("../db/mongodb-connection");

// constructor de Product (no ES6)
const User = function (user) {
  //   this.id = user.id;
  this.name = user.name;
  this.password = user.password;
  this.apiKey = user.apiKey;
};

// métodos de User
User.create = async (newUser) => {
  await mongoClient.connect();
  console.log('Connected successfully to database (MongoDB)');
  const db = mongoClient.db('products');
  const collection = db.collection('users');
  const insertResult = await collection.insertMany([newUser]);
  return insertResult;
};

User.authenticateKey = async (apikey) => {
  await mongoClient.connect();
  console.log('Connected successfully to database (MongoDB)');
  const db = mongoClient.db('products');
  const collection = db.collection('users');
  const query = { "apiKey": apikey };
  const apiKeyExists = await collection.count(query);
  return apiKeyExists;
}

// User.authenticateKey = (apiKey) => {
//   let apiKeyExists = null;
//   let p = new Promise((res, rej) => {
//     sql.query(`SELECT COUNT(id) FROM users where apiKey='${apiKey}'`,
//       (err, results, fields) => {
//         apiKeyExists = results[0]["COUNT(id)"]
//         // console.log("apiKey exists is database: ",apiKeyExists)
//         res(apiKeyExists)
//       })
//   })
//   return p
// }

module.exports = User;
