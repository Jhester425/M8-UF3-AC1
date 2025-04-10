const User = require('../models/User')

const genAPIKey = () => {
    //create a base-36 string that contains 30 chars in a-z,0-9
    apiKey = [...Array(30)].map((e) => ((Math.random() * 36) | 0).toString(36)).join('');
    // console.log(apiKey);
    return apiKey;
};

const authenticateKey = (req, res, next) => {
    apiKey = req.header('api-key'); //Primero busca API key en el Header
    if (apiKey == undefined) {
        apiKey = req.query.apikey   //Luego busca API key en la URL
    }
    User.authenticateKey(apiKey)
        .then((apiKeyExists) => {
            if (apiKeyExists == true) {
                console.log('User authenticated')
                next();
            }
            else {
                console.log('User not authenticated')
                res.status(403).json("Forbidden. Provide valid API key")
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            // mongoClient.close();
        })
};

module.exports = { genAPIKey, authenticateKey }