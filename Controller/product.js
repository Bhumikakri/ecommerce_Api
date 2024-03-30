const productModel = require("../Model/product");
const ObjectId = require("mongodb").ObjectId;
// const jwt = require("jsonwebtoken");

const saveProduct = async (req, res) => {
  const newProduct = await productModel.create(req.body);

  res.json({
    success: true,
    message: "create product successfully",
  });
};

const updateProduct = async (req, res) => {
  try {
    await productModel.findByIdAndUpdate(req.params.productId, {
      $set: req.body,
    });
    res.json({
      success: true,
      message: `product Id :- ${req.params.productId} , updated successfully`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "not updated try again later",
    });
  }
};

const getProducts = async (req, res) => {
  const allproduct = await productModel.find({});
  res.json({
    success: true,
    result: allproduct,
  });
};

const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.productId);
  res.json({
    success: true,
    message: "product deleted successfully",
  });
  } catch (error) {
    res.json({
      success: false,
      message: "invalid product Id",
    });
  }
  
};

const likedislikeController = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  if (req.params.action === "like") {
    await productModel.findByIdAndUpdate(req.params.productId, {
      $push: { like: req.user._id },
      $pull: { dislike: req.user._id },
    });

    res.json({
      success: true,
      message: "product liked",
    });
  } else {
    await productModel.findByIdAndUpdate(req.params.productId, {
      $push: { dislike: req.user._id },
      $pull: { like: req.user._id },
    });

    res.json({
      success: true,
      message: "product disliked",
    });
  }
};

const productDetailController = async (req, res) => {
  // console.log(req.query);
  const ProDetail = await productModel
    .findById(req.query.productId)
    .populate("like")
    .populate("dislike");

  res.json({
    status: true,
    message: "this is product details api",
    result: ProDetail,
  });
};

const productreviewController = async (req, res) => {
  try {
    // console.log("1 ",req.body);
    // console.log("2_ ",req.params.productId);
    // console.log("3_ ",req.user._id);

    const product = await productModel.findById(req.params.productId);

    const reviews = product.review.find(
      (reviews) => reviews.userId.toString() === req.user._id.toString()
    );
    // console.log(reviews);

    if (reviews) {
      const findObj = {
        review: {
          $elemMatch: {
            userId: req.user._id,
            rating: reviews.rating,
          },
        },
      };

      const updateobj = {
        $set: {
          "review.$.rating": req.body.rating,
          "review.$.comment": req.body.comment,
        },
      };

      await productModel.updateOne(findObj, updateobj);

      res.json({
        success: true,
        message: "update the reviews",
      });
      return;
    }
    await productModel.findByIdAndUpdate(
      req.params.productId,
      {
        $push: {
          review: {
            rating: req.body.rating,
            comment: req.body.comment,
            userId: req.user._id,
          },
        },
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      message: "product review add successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveProduct,                    //complete
  updateProduct,                 //complete
  getProducts,                   //complete
  deleteProduct,                 //complete
  likedislikeController,         //complete
  productDetailController,       //complete
  productreviewController,       //complete
};
