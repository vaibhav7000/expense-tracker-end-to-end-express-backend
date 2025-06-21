const { Router } = require("express");
const { addUserInDatabase, provideJWT } = require("../controllers/userController.js");
const { verifyUserType, checkUserExistInDB } = require("../middlewares/user.js");
const router = Router();

router.post("/signup", verifyUserType, addUserInDatabase);

// sending jwt to user in this route-handler
router.post("/signin", verifyUserType, checkUserExistInDB, provideJWT);

// directly exporting router
module.exports = router;