const cartModule = require("../Model/cart");
const productModel = require("../Model/product");

const createCart = async (req, res) => {
  // console.log(req.body.products);
  const userCart = await cartModule.findOne({ userId: req.user._id });

  if (userCart) {
  } else {
    let cartTotal = 0;
    const productsToAdd = [];

    for (let i = 0; i < req.body.products.length; i++) {
      const currentProduct = req.body.products[i];
      const { price } = await productModel.findById(currentProduct.productId, {
        price: 1,
        _id: 0,
      });
      

      const product = {
        ...currentProduct,
        price,
      };
      productsToAdd.push(product);

      const priceForProduct = currentProduct.quantity * price;
      cartTotal += priceForProduct;
    }

    await cartModule.create({
        products: productsToAdd,
        cartTotal: cartTotal,
        userId: req.user._id,
    });

    res.json({
      success: true,
      Message: "cart created",
    });
  }
};

const getCart = async (req, res) => {
  try {
    // Find the user's cart based on userId
    const userCart = await cartModule.findOne({ userId: req.user._id });
    if (userCart) {
      // Respond with user's cart if found
      res.json({
        success: true,
        message: "User cart retrieved successfully",
        cart: userCart,
      });
    } else {
      // Respond with error if user's cart is not found
      res.status(404).json({
        success: false,
        message: "User cart not found",
      });
    }
  } catch (error) {
    // Handle error if getting cart fails
    res.status(500).json({
      success: false,
      message: "Failed to get user cart",
      error: error.message,
    });
  }
};

module.exports = {
  createCart,
  getCart,
};
