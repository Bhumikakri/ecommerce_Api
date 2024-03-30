const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("categories", categorySchema);