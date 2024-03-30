const dayjs = require("dayjs");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const orderModel = require("../Model/order");
const cartModel = require("../Model/cart");
const couponModel = require("../Model/coupon");

const createOrder = async (req, res) => {
  try {
    const userCart = await cartModel.findOne({ userId: req.user._id });

    if (!userCart) {
      return res.status(400).json({
        success: false,
        message: "Empty cart please add item in the cart",
      });
    }

    const couponCode = req.body.coupon;

    const coupon = await couponModel.findOne({ couponCode, isActive: true });

    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    const couponstartDate = dayjs(coupon.startDate);
    const couponendDate = dayjs(coupon.endDate);
    const currentDateTime = dayjs();
    // console.log(currentDateTime.isAfter(couponstartDate), currentDateTime.is(couponendDate));

    if (
      currentDateTime.isBefore(couponstartDate) &&
      currentDateTime.isAfter(couponendDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "coupon expire",
      });
    }

    //   const cartTotal = cartTotal;
    let couponDiscountInRs = (
      (userCart.cartTotal / 100) *
      coupon.discountPercentage
    ).toFixed(2);

    if (couponDiscountInRs > coupon.maxDiscountInRs) {
      couponDiscountInRs = coupon.maxDiscountInRs;
    }

    const amount = (userCart.cartTotal - couponDiscountInRs).toFixed(2);

    let deliveryAddress = req.body.deliveryAdress;
    console.log(deliveryAddress);
    if (!deliveryAddress) {
      deliveryAddress = req.user.address;
    }

    const deliveryDate = dayjs().add(7, "day");

    const newOrder = await orderModel.create({
      cart: userCart,
      userId: req.user._id,
      amount,
      coupon: coupon._id,
      deliveryAdress: deliveryAddress,
      orderPlaceAt: currentDateTime,
      deliveryDate,
      orderStatus: "PLACED",
      modeOfpayment: req.body.modeOfpayment,
    });

    let pgresponse;
    if (req.body.modeOfpayment === "COD") {
      // nothing to do here
    } else {
      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: newOrder._id,
        payment_capture: 1,
      };

      console.log(options);
      try {
        pgresponse = await razorpay.orders.create(options);
        console.log(pgresponse);
      } catch (error) {
        console.log(error);
      }
    }

    res.json({
      success: true,
      message: "order placed successfully",
      orderId: newOrder._id,
      paymentInformation: {
        amount: pgresponse.amount_due,
        orderId: pgresponse.id,
        currency: pgresponse.currency,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "something went wrong please try again after some time",
    });
  }
};

const getOrder = async (req, res) => {
  const response = await orderModel.find({ userId: req.user._id });
  if (order) {
    return res.json({
      success: true,
      message: "your order details here",
      result: response,
    });
  }

  res.json({
    success: false,
    message: "you have not ordered yet",
  });
};

const cancelOrder = async (req, res) => {
  // const response = await orderModel.find({ userId: req.user._id });
  res.json({
    success: true,
    message: "this is dummy cancel order",
    result: response,
  });
};

module.exports = {
  createOrder,  //complete
  getOrder,     //complete
  cancelOrder,
};

// cancel order ka api bnana hh

