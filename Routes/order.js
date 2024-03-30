const express = require("express");

const router = express.Router();

const orderController = require("../Controller/order")

router.post("/", orderController.createOrder )

router.get("/", orderController.getOrder )

router.get("/cancelOrder", orderController.cancelOrder )

module.exports = router;