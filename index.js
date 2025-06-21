const express = require("express");
const cors = require("cors");
const app = express();
const { connection } = require("./src/db/db.js");
const userRouter = require("./src/routes/userRoutes.js");
const transactionRouter = require("./src/routes/transactionRoute.js")
const databaseName = "expense_tracker"
const dbURL = `mongodb+srv://vc160222:vc160222@cluster0.xl0f3om.mongodb.net/${databaseName}`;
const port = 3000;

// sending good things that browser likes so that it does not block the request
app.use(cors({
    origin: "*"
}))

// all our routes will send json-data inside the body;
app.use(express.json());

async function main() {
    try {
        const response = await connection(dbURL);
        // response will be true
        app.listen(port,function() {
            console.log("server started");
        })
    } catch(err) {
        console.log("error occur when connecting with mongoDB");
        process.exit(1); 
    }
}

main();

app.use("/user", userRouter);

app.use("/transactions", transactionRouter);


// global-catches -> middleware to handle global errors that comes in the routes
app.use(function(err, req, res, next) {
    if(err) {
        res.status(500).json({
            msg: "Something up with the server, Tra again later"
        })
        return
    }
    next();
})


// route-not-found-middleware
app.use(function(req, res, next) {
    res.status(404).json({
        msg: "Route not present"
    })
})

