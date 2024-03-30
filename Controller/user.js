const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Model/user");
const dotenv = require('dotenv'); 

dotenv.config();

const userRegister = async (req, res) => {
  //  console.log(req.body);

  try {
    const newuser = new userModel({
      ...req.body,
    });
    await newuser.save();

    res.json({
      success: true,
      message: "user created Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "something went wrong try again later",
    });
  }
};

const userUpdate = async (req, res) => {
  try {
    console.log(req.body);
    await userModel.findByIdAndUpdate(req.user._id, {$set: req.body});

    res.json({
      success: true,
      message: "user updated Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "something went wrong try again later",
    });
  }
};

const userDelete = async (req, res) => {
  console.log("1", req.user.id);
  console.log("2", req.user._id);
  console.log("3", req.user);

  try {
    const deletedUser = await userModel.findByIdAndDelete(req.user.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "something went wrong try again later",
    });
  }
};

const userLogin = async (req, res) => {
  //   console.log(req.body);
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      seccess: false,
      message: "Invalid username and password",
    });
  }

  //   console.log(user.password);
  if (user.token) {
    // jwt.verify()
    return res.status(400).json({
      success: false,
      message: "You are already logged in",
    });
  }
  const isCorrectPasword = bcrypt.compareSync(req.body.password, user.password);

  const expiryDate = Math.floor(new Date().getTime() / 1000) + 3600;

  if (isCorrectPasword) {
    const payload = {
      id: user._id,
      name: user.firstname,
      role: user.role,
      exp: expiryDate,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY);


    // if (!user.token || Date.now() >= payload.exp * 1000) {
      const updateToken = token;
      await userModel.findByIdAndUpdate(user._id, {$set: {token: updateToken} } );
    // }

    res.json({
      success: true,
      message: "Login Successfully",
      token,
    });
  } else {
    res.json({
      success: false,
      message: "Incorrect password",
    });
  }
};

const userLogout = async (req, res) => {
  try {
    const user = await userModel.findOne({ token: req.headers.authorization });

    if (user) {
      user.token = null;
      await user.save();
    }
    res.json({
      success: true,
      message: "LogOut successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  
  res.json({
    success: true,
    message: "demo forget password",
  });
};

const resetPassword = async (req, res) => {
  // console.log(req.params.email);
  
  const user = await userModel.findOne({ email: req.params.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  } else {
    user.password = req.body.password; 
    await user.save();
    return res.status(200).json({ message: "password reset successfully" });
  }
};

const addproductToWishlist = async (req, res) => {
  await userModel.findByIdAndUpdate(req.user._id, {
    $push: { wishlist: req.body.productId },
  });

  res.json({
    success: true,
    message: "add wishlist successfully",
  });
};

const getwishlist = async (req, res) => {
  const user = await userModel
    .findById(req.user._id, "wishlist")
    .populate("wishlist", "title");
  res.json({
    success: true,
    result: user,
  });
};

const setAddress = async (req, res) => {
  const address = req.body;
  const setObject = {};

  if (address.address) {
    setObject["address.address"] = address.address;
  }

  if (address.city) {
    setObject["address.city"] = address.city;
  }

  if (address.state) {
    setObject["address.state"] = address.state;
  }

  if (address.pincode) {
    setObject["address.pincode"] = address.pincode;
  }

  await userModel.findByIdAndUpdate(req.user._id, { $set: setObject });
  res.json({
    success: true,
    message: "updated address successfully",
  });
};

module.exports = {
  userRegister, //complete
  userUpdate,   //complete
  userDelete, //complete
  forgotPassword,    
  resetPassword,     //complete
  userLogin,         //complete only one user login at a time
  userLogout,        //almost complete
  addproductToWishlist, //complete
  getwishlist,          //complete
  setAddress,           //complete
};
