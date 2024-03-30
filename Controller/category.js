const categorymodel = require("../Model/category");
const productmodel = require("../Model/product");

const createcategory = async (req, res) => {
  const products = await productmodel.find({
    category: req.body.title,
  });

  await categorymodel.create({ ...req.body, quantity: products.length });
  res.json({
    status: true,
    message: "category added successfully",
  });
};

const getallcategory = async (req, res) => {
  try {
    const allcategories = await categorymodel.find({});
    res.json({
      status: true,
      result: allcategories,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      Message: error.Message,
    });
  }
};

const getOnecategory = async (req, res) => {
  try {
    const onecategory = await categorymodel.findOne({
      title: req.params.categoryName,
    });
    res.json({
      status: true,
      result: onecategory,
    });
  } catch (error) {
    res.status(505).json({
      status: false,
      message: error.Message,
    });
  }
};

const editcategory = async (req, res) => {
  try {
    const products = await productmodel.find({
      category: req.body.title,
    });

    await categorymodel.findByIdAndUpdate(req.params.categoryId, {
      $set: { ...req.body, quantity: products.length },
    });
    res.json({
      status: true,
      message: `updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deletecategory = async (req, res) => {
  try {
    const onecategory = await categorymodel.findByIdAndDelete(
      req.params.categoryId
    );

    if (onecategory) {
      return res.json({
        status: true,
        message: "category deleted successfully",
      });
    }

    res.status(404).json({
      status: true,
      message: "category not available",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createcategory, //complete
  getallcategory, //complete
  getOnecategory, //complete
  editcategory, //complete
  deletecategory, //complete
};
