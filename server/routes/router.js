const express = require("express");
const router = express.Router();
const schemas = require("../modules/schemas");

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.post("/user", async (req, res) => {
  const { name, email, img, cartItems, wishlist, orders, addresses, address } =
    req.body;
  try {
    // Check if user already exists
    const existingUser = await schemas.Users.findOne({ email: email });

    if (existingUser) {
      return res.status(200).send("User already exists");
    }

    // Create new user if not exists
    const newUser = new schemas.Users({
      name,
      email,
      img,
      cartItems,
      wishlist,
      orders,
      addresses,
      address,
    });
    await newUser.save();

    res.status(201).send("User data posted successfully");
  } catch (error) {
    res.status(500).send("There was an error posting the user data!");
    console.log(error);
  }
});

module.exports = router;
