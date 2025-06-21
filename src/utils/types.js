const z = require("zod");

const userType = z.object({
    username: z.string().trim().min(3).regex(/^[A-Za-z0-9_]+$/),
    password: z.string().trim().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
})


const transactionType = z.object({
    title: z.string().trim().min(3),
    price: z.coerce.number(), // this will first try to convert the given thing into number if not possible than throw error
    description: z.string().trim().min(3),
    // these will be added by mongoose 
    // createAt: z.string().datetime(), // this will accept only UTC time if you want to verify local time include local: true
    //updatedAt: z.string().datetime(),
});

module.exports = {
    userType, transactionType
}