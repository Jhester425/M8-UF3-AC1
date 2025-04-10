const express = require('express')
const router = express.Router()
const auth = require('../auth/auth')

const renderHome = require('../controllers/site/home')

const getProducts = require('../controllers/api/getProducts')
const getProduct = require('../controllers/api/getProduct')
const createProduct = require('../controllers/api/createProduct')
const updateProduct = require('../controllers/api/updateProduct')
// const deleteProduct = require('../controllers/api/deleteProduct')
const createUser = require('../controllers/users/createUser')

router.get('/api', renderHome)
router.get('/api/products', auth.authenticateKey, getProducts)
router.get('/api/products/:productID', auth.authenticateKey, getProduct)
router.post('/api/products', auth.authenticateKey, createProduct) 
router.put('/api/products/:productID', auth.authenticateKey, updateProduct) 
// router.delete('/:productID', deleteProduct)
router.post('/users/register', createUser)

module.exports = router
