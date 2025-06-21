const { User } = require("../db/db.js");
const jwtPassword = "random123#"
const jwt = require("jsonwebtoken");

async function addUserInDatabase(req, res, next) {
    const user = req.body;

    const endUser = new User(user);

    try {
        // this will save the user inside the database collection name users
        const response = await endUser.save();

        res.status(200).json({
            msg: "user created successfully!",
            user: response
        })
    } catch(err) {
        next(err);
    }
}

function provideJWT(req, res, next) {
    const username = req.body.username;
    const token = jwt.sign({
        username
    }, jwtPassword);


    res.status(200).json({
        msg: "Signin successful",
        token
    })
}

module.exports = {
    addUserInDatabase, provideJWT
}