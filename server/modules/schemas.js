const { Descriptions } = require("antd");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number },
  img: { type: String },
  cartItems: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  wishlist: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
    },
  ],
  orders: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  addresses: [
    {
      country: { type: String, required: true },
      name: { type: String, required: true },
      phoneNo: { type: Number, required: true },
      streetAddr: { type: String },
      city: { type: String },
      dist: { type: String },
      state: { type: String },
      zipCode: { type: Number },
    },
  ],
  address: { type: String },
});

const productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  src: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: Array },
});

const Users = mongoose.model("Users", userSchema, "users");
const Product = mongoose.model("Product", productSchema, "products");

module.exports = { Users, Product };
