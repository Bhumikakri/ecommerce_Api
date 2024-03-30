const brandmodel = require("../Model/brand");
const productmodel = require("../Model/product");

const createbrand = async (req, res) => {
  const products = await productmodel.find({
    brand: req.body.title,
  });

  await brandmodel.create({ ...req.body, quantity: products.length });
  res.json({
    status: true,
    message: "brand added successfully",
  });
};

const getallbrand = async (req, res) => {
  try {
    const allbrands = await brandmodel.find({});
    res.json({
      status: true,
      result: allbrands,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      Message: error.Message,
    });
  }
};

const getOnebrand = async (req, res) => {
  const onebrand = await brandmodel.findOne({ title: req.params.brandName });
  res.json({
    status: true,
    result: onebrand,
  });
};

const editbrand = async (req, res) => {
  try {
    const products = await productmodel.find({
      brand: req.body.title,
    });

    await brandmodel.findByIdAndUpdate(req.params.brandId, {
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

const deletebrand = async (req, res) => {
  try {
    const onebrand = await brandmodel.findByIdAndDelete(req.params.brandId);

    if(onebrand){
      return res.json({
      status: true,
      message: "brand deleted successfully",
    }); 
    }

    res.status(404).json({
        status: true,
        message: "brand not available",
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createbrand,  //complete
  getallbrand,  //complete
  getOnebrand,  //complete
  editbrand,    //complete
  deletebrand,  //complete
};
