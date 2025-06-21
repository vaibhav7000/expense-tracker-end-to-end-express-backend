const { Router } = require("express");
const { addUserInDatabase, provideJWT } = require("../controllers/userController.js");
const { verifyUserType, checkUserExistInDB } = require("../middlewares/user.js");
const { verifyJWT } = require("../middlewares/transaction.js")
const router = Router();

router.post("/signup", verifyUserType, addUserInDatabase);

// sending jwt to user in this route-handler
router.post("/signin", verifyUserType, checkUserExistInDB, provideJWT);

router.post("/verify", verifyJWT, function(req, res, next) {
    res.status(200).json({
        msg: "verification successfull"
    })
});

// directly exporting router
module.exports = router;