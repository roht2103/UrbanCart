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
      id: { type: Number, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: String, required: true },
      src: { type: String, required: true },
      category: { type: String, required: true },
      gender: { type: String, required: true },
      description: { type: String, required: true },
      keywords: { type: Array },
    },
  ],
  wishlist: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: String, required: true },
      src: { type: String, required: true },
      category: { type: String, required: true },
      gender: { type: String, required: true },
      description: { type: String, required: true },
      keywords: { type: Array },
    },
  ],
  orders: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: String, required: true },
      orderDate: { type: Date, required: true },
      orderConfirmDate: { type: Date, required: true },
      deliveryDate: { type: Date, required: true },
      orderId: { type: String, required: true },
      src: { type: String, required: true },
      category: { type: String, required: true },
      gender: { type: String, required: true },
      description: { type: String, required: true },
      keywords: { type: Array },
      address: { type: Object },
    },
  ],
  addresses: [
    {
      country: { type: String },
      name: { type: String },
      phoneNo: { type: Number },
      streetAddr: { type: String },
      city: { type: String },
      dist: { type: String },
      state: { type: String },
      zipCode: { type: Number },
    },
  ],
  address: {
    country: { type: String },
    name: { type: String },
    phoneNo: { type: Number },
    streetAddr: { type: String },
    city: { type: String },
    dist: { type: String },
    state: { type: String },
    zipCode: { type: Number },
  },
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
const Products = mongoose.model("Products", productSchema, "products");

module.exports = { Users, Products };
