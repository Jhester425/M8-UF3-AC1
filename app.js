
// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path'); // ✅ Required for setting views path
const slugify = require('slugify');

// Simulating in-memory storage for users and products
let users = [];
let products = [];

// Server instantiation
const app = express();

// View engine setup 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());

// Generate a simple API key
const generateApiKey = () => `api-key-${Date.now()}`;

// Simulate in-memory user storage
const User = {
  username: String,
  password: String,
  apiKey: String,
};

// Simulate in-memory product storage
const Product = {
  id: Number,
  name: String,
  price: Number,
};

// /api route using slugify for 'aviso'
app.get('/api', (req, res) => {
  const slugifiedMessage = slugify('Welcome to the API interface!', {
    replacement: '*',
    lower: true,
  });
  res.render('index', { 
    titulo: 'API Home',
    aviso: slugifiedMessage,
    howto: 'Follow the instructions below to use the API:',
    rutas: [
      ['Register User', '/api/users/register'], 
      ['Get Products', '/api/products']
    ]
  });
});


// User registration route (POST /api/users/register)
app.post('/api/users/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const apiKey = generateApiKey();
  const newUser = { username, password: hashedPassword, apiKey };
  users.push(newUser);

  res.status(201).json({
    message: 'User registered successfully.',
    'api-key': apiKey
  });
});

// Middleware to authenticate API key for product routes
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.header('api-key') || req.query.apikey;

  if (!apiKey) {
    return res.status(403).json({ message: 'API key is required' });
  }

  const user = users.find(u => u.apiKey === apiKey);
  if (!user) {
    return res.status(403).json({ message: 'Invalid API key' });
  }

  next();
};

// List all products (GET /api/products)
app.get('/api/products', authenticateApiKey, (req, res) => {
  res.json(products);
});

// Get a product by ID (GET /api/products/:productID)
app.get('/api/products/:productID', authenticateApiKey, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.productID));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Create a new product (POST /api/products)
app.post('/api/products', authenticateApiKey, (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Product name and price are required' });
  }
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product (PUT /api/products/:productID)
app.put('/api/products/:productID', authenticateApiKey, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.productID));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const { name, price } = req.body;
  product.name = name || product.name;
  product.price = price || product.price;
  res.json(product);
});

// Delete a product (DELETE /api/products/:productID)
app.delete('/api/products/:productID', authenticateApiKey, (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.productID));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products.splice(productIndex, 1);
  res.status(204).end();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Server startup
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});


// Root path route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});