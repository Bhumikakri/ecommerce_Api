const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  like: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users",
  },
  dislike: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users",
  },
});

const blogmodel = mongoose.model("blogs", blogSchema);
module.exports = blogmodel;
