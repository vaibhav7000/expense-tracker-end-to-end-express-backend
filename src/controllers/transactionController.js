const { default: mongoose } = require("mongoose");
const { Transaction, User } = require("../db/db.js");

async function addTransactionInDatabase(req, res, next) {
    const username = req.username;
    const transaction = req.body;

    try {
        const dbUser = await User.findOne({
            username
        })

        // the id is present inside the dbUser
        const newTransaction = new Transaction({
            ...transaction, 
            owner: dbUser._id
        });

        try {
            const resposne = await newTransaction.save();

            res.status(200).json({
                msg: "added successfully",
                transaction: resposne
            })

        } catch(error) {
            next(error)
        }


    } catch (error) {
        next(error);
    }
}

async function getAllTransactions(req, res, next) {
    const username = req.username;

    try {
        const response = await User.findOne({
            username
        })

        try {
            const allTransaction = await Transaction.find({
                owner: response._id
            })


            res.status(200).json({
                allTransaction
            })
        } catch (error) {
            next(error)
        }
    } catch(err) {
        next(err);
    }
}

async function updateTransactionDetails(req, res, next) {
    const transactionId = req.query.id;
    // will only contains that we want fields that we want to update
    const updatedData = req.body;

    if(!mongoose.Types.ObjectId.isValid(transactionId)) {
        res.status(400).json({
            msg: "Invalid transaction id sent"
        })
        return
    }

    try {
        const resposne  = await Transaction.findByIdAndUpdate(transactionId, {
            ...updatedData
        }, {
            runValidators: true,
            new: true
        })

        // new updated JSON data -> response
        res.status(200).json({
            msg: "Data is updated",
            updatedData: resposne
        })
    } catch(error) {
        next(error);
    }
}

async function deleteTransaction(req, res, next) {
    const transactionId = req.query.id;

    if(!mongoose.Types.ObjectId.isValid(transactionId)) {
        res.status(400).json({
            msg: "Invalid transaction id sent"
        })
        return
    }

    try {
        const deleteTransaction = await Transaction.findByIdAndDelete(transactionId) // returns the delete data else null

        if(!deleteTransaction) {
            res.status(404).json({
                msg: "No transaction with this id exist"
            })
            return
        }

        res.status(200).json({
            msg: "Transaction is deleted from the backend",
            deleteTransaction
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    addTransactionInDatabase, getAllTransactions, updateTransactionDetails, deleteTransaction
}