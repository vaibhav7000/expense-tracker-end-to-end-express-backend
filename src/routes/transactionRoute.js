const { Router } = require("express");
const router = Router();
const { verifyJWT, verifyTransactionType } = require("../middlewares/transaction.js");
const { addTransactionInDatabase, getAllTransactions, updateTransactionDetails, deleteTransaction } = require("../controllers/transactionController.js")
 
// all these transaction routes should be expose if the user has valid jwt since all the routes require these we will use the middle-ware at the top 

router.use(verifyJWT);

router.post("/newTransaction",verifyTransactionType, addTransactionInDatabase);

router.get("/allTransaction", getAllTransactions);

// will be sending transaction id in the query-parameters
router.put("/updateTransaction", updateTransactionDetails)

router.delete("/deleteTransaction", deleteTransaction)

module.exports = router;