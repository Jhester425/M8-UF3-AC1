const Product = require('../../models/Product.js')

const getProduct = ((req, res) => {
    const id = req.params.productID
    Product.listByID(id)
        .then((results) => {
            // HTTP response
            console.log("Products served successfully. Count: ", results.length);
            res.json(results);
        })
        .catch((error) => {
            // HTTP response
            console.log("Error when getting product");
            res.json("Error when getting product");
        })
        .finally(()=>{
            // mongoClient.close();
        })
})

module.exports = getProduct