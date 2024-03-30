const express = require("express");
const userController = require("../Controller/user");
const authmiddleware = require("../middleware/Auth");

const router = express.Router();

router.post("/register", userController.userRegister);

router.put("/updateUser",authmiddleware(["buyer", "admin", "seller"]), userController.userUpdate);

router.delete("/deleteAccount",authmiddleware(["buyer", "seller"]), userController.userDelete);

router.post("/login", userController.userLogin);

router.post("/logout", userController.userLogout);

router.post("/forget", userController.forgotPassword);

router.post("/reset-password/:email", userController.resetPassword);

router.post(
  "/wishlist",
  authmiddleware(["admin", "seller", "buyer"]),
  userController.addproductToWishlist
);

router.get(
  "/wishlist",
  authmiddleware(["buyer", "seller", "admin"]),
  userController.getwishlist
);

router.post(
  "/address",
  authmiddleware(["buyer", "seller", "admin"]),
  userController.setAddress
);

module.exports = router;
