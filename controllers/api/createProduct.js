const Product = require('../../models/Product.js')

const createProduct = ((req, res) => {
    // Create a Product
    const product = new Product({
        id: parseInt(req.body.id),
        name: req.body.name,
        price: req.body.price
    });

    // Save Product in the database
    Product.create(product)
        .then((results) => {
            // HTTP response
            console.log("Product created successfully");
            res.json("Product created successfully");
        })
        .catch((error) => {
            // HTTP response
            console.log("Error when creating product");
            res.json("Error when creating product");
        })
        .finally(()=>{
            // mongoClient.close();
        })
})

module.exports = createProduct

