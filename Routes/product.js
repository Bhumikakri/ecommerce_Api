const express = require("express");

const authmiddleware = require("../middleware/Auth");

const productController = require("../Controller/product");

const proRoutes = express.Router();

proRoutes.post("/", authmiddleware(["admin"]), productController.saveProduct);

proRoutes.patch(
  "/:productId",
  authmiddleware(["seller", "admin"]),
  productController.updateProduct
);

proRoutes.get(
  "/",
  authmiddleware(["buyer", "seller", "admin"]),
  productController.getProducts
);

proRoutes.delete(
  "/:productId",
  authmiddleware(["admin", "seller"]),
  productController.deleteProduct
);

proRoutes.put(
  "/:productId/review",
  authmiddleware(["buyer", "admin"]),
  productController.productreviewController
);

proRoutes.post(
  "/:productId/:action",
  authmiddleware(["buyer", "seller", "admin"]),
  productController.likedislikeController
);

proRoutes.get("/product-by-id", productController.productDetailController);

module.exports = proRoutes;
