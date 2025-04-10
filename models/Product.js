// const sql = require("../db/mysql-connection");
const mongoClient = require("../db/mongodb-connection");

// constructor de Product (no ES6)
const Product = function (product) {
  this.id = product.id;
  this.name = product.name;
  this.price = product.price;
};

// métodos de producto
Product.create = async (newProduct) => {
  await mongoClient.connect();
  console.log('Connected successfully to database (MongoDB)');
  const db = mongoClient.db('products');
  const collection = db.collection('products');
  const insertResult = await collection.insertMany([newProduct]);
  return insertResult;
};

Product.listByID = async (id) =>{
  await mongoClient.connect();
  console.log('Connected successfully to database (MongoDB)');
  const db = mongoClient.db('products');
  const collection = db.collection('products');
  let query = {"id": parseInt(id)};
  const findResult = await collection.find(query).toArray();
  return findResult;
}

Product.listAll = async () =>{
  await mongoClient.connect();
  console.log('Connected successfully to database (MongoDB)');
  const db = mongoClient.db('products');
  const collection = db.collection('products');
  const findResult = await collection.find({}).toArray();
  return findResult;
}

Product.update = async (product) => {
  await mongoClient.connect();
  console.log('Connected successfully to database (MongoDB)');
  const db = mongoClient.db('products');
  const collection = db.collection('products');
  const selector = {"id": parseInt(product.id)};
  const set  = { "$set": {"name": product.name, "price": product.price}};
  const updateResult = await collection.updateMany(selector,set);
  return updateResult;
};

//TBD: Product.delete

module.exports = Product;

