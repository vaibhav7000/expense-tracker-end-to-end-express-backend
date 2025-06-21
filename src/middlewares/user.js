const { User } = require("../db/db.js");
const {userType}  = require("../utils/types.js");

function verifyUserType(req, res, next) {
    const user = req.body;

    const result = userType.safeParse(user);

    if(!result.success) {
        // This status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
        res.status(400).json({
            msg: "Some fields are missing from the client",
            issues: result.error.issues, 
            name: result.error.name
        })
        return
    }

    next();
}

async function checkUserExistInDB(req, res, next) {
    const user = req.body;

    try {
        const dbUser = await User.findOne({
            username: user.username,
            password: user.password
        })


        if(!dbUser) {
            // this user does exist in the database
            res.status(403).json({
                msg: "This username and password does not exist in the database"
            })
            return
        }

        next();
    } catch (error) {
        
    }

}




module.exports = {
    verifyUserType, checkUserExistInDB
}