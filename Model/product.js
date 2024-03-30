const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true  
    },
    like: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "users"
    },
    dislike: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "users"
    },
    review: {
        type: [
            {
                rating: Number,
                comment: String,
                userId: mongoose.Schema.Types.ObjectId
            }
        ],
        default: [],
    }
})

const productModel = mongoose.model("products", productschema)

module.exports = productModel;