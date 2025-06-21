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


module.exports = {
    addTransactionInDatabase
}