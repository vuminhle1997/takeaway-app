const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    products: {
        type: []
    },
    payment: {
        enum: ["Paypal", "Cash", "Visa"]
    },
    total: {
        type: Number
    }
}, {timestamps: true});

module.exports = mongoose.model("Bill", billSchema);