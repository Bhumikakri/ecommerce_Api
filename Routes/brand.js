const express = require("express");

const route = express.Router();

const blogController = require("../Controller/brand");
const authmiddleware = require("../middleware/Auth");

route.post("/",authmiddleware(["admin", "seller"]),blogController.createbrand);

route.get("/",authmiddleware(["admin", "seller", "buyer"]), blogController.getallbrand);

route.get("/:brandName",authmiddleware(["admin", "seller", "buyer"]), blogController.getOnebrand);

route.patch("/:brandId",authmiddleware(["admin", "seller"]), blogController.editbrand);

route.delete("/:brandId",authmiddleware(["admin", "seller"]), blogController.deletebrand);


module.exports = route;