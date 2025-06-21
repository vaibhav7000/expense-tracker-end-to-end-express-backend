const jwt = require("jsonwebtoken");
const jwtPassword = "random123#"; // put all the secrets in secrets.js
const { transactionType } = require("../utils/types.js")

function verifyJWT(req, res, next) {
    const token = req.headers["token"];
    try {
        const response = jwt.verify(token, jwtPassword); // if the token is not correct => the internal library will throw error
        req.username= response.username;
        next();
    } catch(error) {
        res.status(403).json({
            msg: "jwt is incorrect"
        })
    }
}

function verifyTransactionType(req, res, next) {
    const transaction = req.body;

    const result = transactionType.safeParse(transaction);

    if(!result.success) {
        res.status(400).json({
            msg: "Some fields are missing for sending transactions"
        })
        return
    }

    next();
}

module.exports = {
    verifyJWT, verifyTransactionType
}