const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["Food", "Drink", "Appetizer", "Snack"],
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://mrsldna.org/wp-content/uploads/2019/03/product-placeholder.gif"
    },
    price: {
        type: Number
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);