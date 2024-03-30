const express = require("express");

const router = express.Router();
const couponController = require("../Controller/coupon");
const authmiddleware = require("../middleware/Auth");


router.post("/",authmiddleware(["admin"]),couponController.createCoupon);

router.get("/",authmiddleware(["buyer", "admin", "seller"]),couponController.getCoupon);

router.patch("/:couponId",authmiddleware(["admin"]),couponController.updateCoupon);

router.delete("/",authmiddleware(["admin"]),couponController.deleteCoupon);

module.exports = router;