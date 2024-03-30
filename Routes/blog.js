const express = require("express");

const router = express.Router();

const blogController = require("../Controller/blog");
const authmiddleware = require("../middleware/Auth");

router.post(
  "/",
  authmiddleware(["buyer", "admin", "seller"]),
  blogController.createBlog
);

router.get(
  "/",
  authmiddleware(["buyer", "admin", "seller"]),
  blogController.viewBlog
);

router.patch(
  "/:blogId",
  authmiddleware(["buyer", "admin", "seller"]),
  blogController.editBlog
);

router.delete(
  "/:blogId",
  authmiddleware(["buyer", "admin", "seller"]),
  blogController.deleteBlog
);

router.post(
  "/:blogId/:action",
  authmiddleware(["buyer", "seller", "admin"]),
  blogController.likedislikeblog
);

module.exports = router;
