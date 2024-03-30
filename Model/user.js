const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: false,
        default: "",
    },
    city: {
        type: String,
        required: false,
        default: ""
    },
    state: {
        type: String,
        required: false,
        default: ""
    },
    pincode: {
        type: Number,
        required: false,
        default: ""
    }

})


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
       type: String,
       required: true 
    },
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "products"
    },
    address: {
        type: addressSchema,
        required: false,
    },
    token: {
        type: String,

    },
    blogs: {
        type: [
            {
                blogsId: mongoose.Schema.Types.ObjectId
            }
        ],
        default: [],
        ref: "blog"
    }

})

userSchema.pre("save", function (){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
})

module.exports = mongoose.model("users", userSchema);


// SIGNLE user login 
// 1. fetch user
// 2. get token from db
// 2.1 if token is null
// allow that user to procced with login
// 2.2 token is not null
// 2.2.1 verify the token
// *if suessfull then send msg := you are already logged in
// else procced and geneate new token

// SIGN USER logout
// set token as null inside user document

// more than one login at a time
// 1. fetch user
// 2. get token list from db
// 3. traverse each token and remove all expired token
// 4. check the size of remaining token list
  //  if size < limit
      // then allow login
      // else send error msg

// more than one logout