const express = require("express");

const cartController = require("../Controller/cart");
const authmiddleware = require("../middleware/Auth");

const cartRoutes = express.Router();

cartRoutes.post("/",authmiddleware(["admin", "buyer", "seller"]),cartController.createCart);

cartRoutes.get("/",authmiddleware(["admin", "buyer", "seller"]),cartController.getCart)

module.exports = cartRoutes;
