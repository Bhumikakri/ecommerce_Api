const express = require("express");
const mongoose = require("mongoose");
// const dotenv = require('dotenv'); 

const userRoutesApi = require("./Routes/user");
const productRoutesApi = require("./Routes/product");
const cartRoutesApi = require("./Routes/cart");
const couponRoutesApi = require("./Routes/coupon");
const orderRouterApi = require("./Routes/order");
const brandRouterApi = require("./Routes/brand");
const blogRouterApi = require("./Routes/blog");
const authmiddleware = require("./middleware/Auth");

// dotenv.config()

const app = express();



mongoose.connect("mongodb+srv://bhumi:bhumi@cluster0.hqwqfux.mongodb.net/")
.then(()=>console.log("db connected succesfully"))
.catch((err)=>console.error(err));

app.use(express.json());


// Routes

app.use("/api/v1/user", userRoutesApi);
app.use("/api/v1/product",productRoutesApi);
app.use("/api/v1/cart",cartRoutesApi);
app.use("/api/v1/coupon",couponRoutesApi);
app.use("/api/v1/blog", blogRouterApi)
app.use("/api/v1/brand", brandRouterApi)
app.use("/api/v1/order",authmiddleware(["buyer"]), orderRouterApi);

app.listen(10000, ()=>{
    console.log(`Server is running up on 10000`);
})