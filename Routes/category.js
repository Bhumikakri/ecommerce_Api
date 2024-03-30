const express = require("express");

const route = express.Router();

const categoryController = require("../Controller/category");
const authmiddleware = require("../middleware/Auth");

route.post("/",authmiddleware(["admin", "seller"]),categoryController.createcategory);

route.get("/",authmiddleware(["admin", "seller", "buyer"]), categoryController.getallcategory);

route.get("/:categoryName",authmiddleware(["admin", "seller", "buyer"]), categoryController.getOnecategory);

route.patch("/:categoryId",authmiddleware(["admin", "seller"]), categoryController.editcategory);

route.delete("/:categoryId",authmiddleware(["admin", "seller"]), categoryController.deletecategory);

module.exports = route;