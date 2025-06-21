const mongoose = require("mongoose");


// user-schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
}, {
    timestamps: true,
    // we can also add timestamps with our custom name like this
    // timestamps: {
    //     createdAt: 'createdOn', updatedAt: 'updatedOn'
    // }
})

// user-model
const User = mongoose.model('User', userSchema);


// Transaction-schema
const transactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    description: String,
    price: Number
}, {
    timestamps: true
})

// transaction-model
const Transaction = mongoose.model('Transaction', transactionSchema);

async function connection(url) {
    try {
        const response = await mongoose.connect(url);
        console.log("connection successfull with the database");
        return true;
    } catch(err) {
        throw err;
    }
}


module.exports = {
    User, Transaction, connection
}