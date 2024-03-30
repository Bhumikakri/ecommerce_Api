const mongoose = require("mongoose");

const cartProduct = new mongoose.Schema({
    productId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
    }

})

const cartSchema = new mongoose.Schema({
    products: {
        type: [cartProduct],
    },
})

const deliveryAddressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: false,
        default: "",
    },
    city: {
        type: String,
        required: false,
        default: ""
    },
    state: {
        type: String,
        required: false,
        default: ""
    },
    pincode: {
        type: Number,
        required: false,
        default: ""
    }
})

const orderSchema = new mongoose.Schema({
    cart: {
        type: cartSchema,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
    },
    deliveryAdress: {
        type: deliveryAddressSchema,
        required: true,
    },
    orderPlaceAt: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    modeOfpayment: {
        type: String,
        required: true,
    },
    transectionId: {
        type: String,
        required: false,
        default: ""
    }
})

module.exports = mongoose.model("orders", orderSchema);