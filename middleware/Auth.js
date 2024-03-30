const jwt = require("jsonwebtoken");
const userModel = require("../Model/user");

const authmiddleware = (role) => async (req, res, next) => {
  try {
    const data = jwt.verify(req.headers.authorization, "AJSJF9837FK30R6FU4");

    console.log(data)
    // const tokenfromheader = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(req.headers.authorization);

    if (role.includes(data.role)) {
      const user = await userModel.findById(data.id);
      // console.log(user);
      req.user=user;
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "forbiden",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = authmiddleware;
