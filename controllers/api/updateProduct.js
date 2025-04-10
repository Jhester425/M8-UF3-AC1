const Product = require('../../models/Product.js')

const updateProduct = ((req, res) => {
    // Create a Product
    const product = new Product({
        id: req.params.productID,
        name: req.body.name,
        price: req.body.price
    });

    // Save Product in the database
    Product.update(product)
        .then((results) => {
            // HTTP response
            console.log("Product updated successfully");
            res.json("Product updated successfully");
        })
        .catch((error) => {
            // HTTP response
            console.log("Error when updating product");
            res.json("Error when updating product");
        })
        .finally(() => {
            // mongoClient.close();
        })
})

module.exports = updateProduct