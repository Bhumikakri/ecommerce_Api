const blogmodel = require("../Model/blog");
const usermodel = require("../Model/user");

const createBlog = async (req, res) => {
  try {
    const newblog = await blogmodel.create({
      ...req.body,
      author: req.user._id,
    });
    console.log(newblog._id);
    await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          blogs: { blogsId: newblog._id },
        },
      },
      {
        new: true,
      }
    );
    res.json({
      status: true,
      message: "blog created successfully ",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

const viewBlog = async (req, res) => {
  try {
    const blogssall = await blogmodel
      .find({})
      .populate("author", ["firstname", "lastname", "role"])
      .populate("like")
      .populate("dislike");
    res.json({
      status: true,
      message: "demo view all blog ",
      result: blogssall,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
    });
  }
};

const editBlog = async (req, res) => {
  //   console.log(req.params);
  //   console.log("1",req.user.blogs);
  try {
    const bloguser = await usermodel.findById(req.user._id);
    // console.log("2",bloguser.blogs);

    const blogEditor = await blogmodel.findById(req.params.blogId);
    // console.log("3",blogEditor);

    const editors = bloguser.blogs.find(
      (blog) => blog.blogsId.toString() === blogEditor._id.toString()
    );

    // console.log(editors);

    if (editors) {
      await blogmodel.findByIdAndUpdate(req.params.blogId, { $set: req.body });
      return res.json({
        status: true,
        message: "blog updated succesfully ",
      });
    }

    res.json({
      status: true,
      message: "blog is not available ",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: false,
      message: "user not found",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const bloguser = await usermodel.findById(req.user._id);
    console.log("2", bloguser.blogs);

    const blogEditor = await blogmodel.findById(req.params.blogId);
    console.log("3", blogEditor);

    const editors = bloguser.blogs.find(
      (blog) => blog.blogsId.toString() === blogEditor._id.toString()
    );

    console.log(editors);

    if (editors) {
      await blogmodel.findByIdAndDelete(blogEditor._id);
      await usermodel.findByIdAndUpdate(
        req.user._id,
        {
          $pull: {
            blogs: { blogsId: blogEditor._id },
          },
        },
        {
          new: true,
        }
      );
      return res.json({
        status: true,
        message: "blog deleted succesfully ",
      });
    }

    res.json({
      status: true,
      message: "already deleted",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const likedislikeblog = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  try {
    if (req.params.action === "like") {
      await blogmodel.findByIdAndUpdate(req.params.blogId, {
        $push: { like: req.user._id },
        $pull: { dislike: req.user._id },
      });

      res.json({
        success: true,
        message: "blog liked",
      });
    } else if(req.params.action === "dislike"){
      await blogmodel.findByIdAndUpdate(req.params.blogId, {
        $push: { dislike: req.user._id },
        $pull: { like: req.user._id },
      });

      res.json({
        success: true,
        message: "blog disliked",
      });
    }
    else{
      await blogmodel.findByIdAndUpdate(req.params.blogId, {
        $pull: { like: req.user._id }
      });

      res.json({
        success: true,
        message: "blog unlike ",
      });
    }
  } catch (error) {
    res.json({
      success: false,
    });
  }
};

module.exports = {
  createBlog, //complete
  viewBlog, //complete
  editBlog, //complete
  deleteBlog, //complete
  likedislikeblog,  //complete
};
