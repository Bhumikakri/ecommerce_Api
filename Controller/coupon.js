const couponModel = require("../Model/coupon");
const dayjs = require("dayjs");

const createCoupon = async (req, res) => {
  // console.log(req.body);
  const couponInfo = req.body;
  const startDate = dayjs(req.body.startDate);
  const endDate = dayjs(req.body.endDate);

  const currentDateTime = dayjs();
  if (
    currentDateTime.isAfter(startDate) &&
    currentDateTime.isBefore(endDate)
  ) {
    const coupondetails = await couponModel.create({...couponInfo, isActive: true });

    return  res.json({
      success: true,
      message: "Coupon Created Successfully",
      result: coupondetails._id,
    });
  }else{
    const coupondetails = await couponModel.create(couponInfo);

    res.json({
      success: true,
      message: "Coupon Created Successfully",
      result: coupondetails._id,
    });
  }

  // console.log(coupondetails);

};

const getCoupon = async (req, res) => {
  const activCoupon = await couponModel.find({ isActive: true });
  if (req.user.role === "admin") {
    const allCoupon = await couponModel.find({});
    return res.json({
      success: true,
      result: allCoupon,
    });
  }
  res.json({
    success: true,
    result: activCoupon,
  });
};

const updateCoupon = async (req, res) => {
  // console.log(req.params.couponId);
  await couponModel.findByIdAndUpdate(req.params.couponId, { $set: req.body });

  res.json({
    success: true,
    message: "Coupon updated successfully",
  });
};

const deleteCoupon = async (req, res) => {
  const deletCoupon = await couponModel.findByIdAndDelete(req.body._id);
  res.json({
    success: true,
    message: "Coupon Deleted Successfully",
  });
};

module.exports = {
  createCoupon, //complete
  getCoupon, //complete
  updateCoupon, //complete
  deleteCoupon, //complete
};
