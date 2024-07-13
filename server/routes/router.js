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

router.get("/user", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await schemas.Users.find({ email: email });
    res.json(user);
    console.log(user); // This line just logs the user data, it does not resend the response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("There was an error fetching the user data!");
  }
});

router.put("/account/cart/quantity", async (req, res) => {
  const { email, product, count } = req.body; // count will be either +1 or -1

  try {
    console.log(
      "Received request to update product quantity for email:",
      email
    );
    console.log("Product to update:", product.productId, "count:", count);

    const user = await schemas.Users.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const productIndex = user.cartItems.findIndex(
      (item) => item.productId === product.productId
    );

    if (productIndex > -1) {
      console.log("Product found in cart, updating quantity");
      // Update the product quantity
      user.cartItems[productIndex].quantity += count;

      // Remove the product if quantity becomes 0
      if (user.cartItems[productIndex].quantity <= 0) {
        user.cartItems.splice(productIndex, 1);
      }

      await user.save();
      console.log("Product quantity updated successfully");
      res.status(200).send(user);
    } else {
      console.log("Product not found in cart");
      res.status(404).send("Product not found in cart");
    }
  } catch (error) {
    console.error(
      "An error occurred while updating the product quantity:",
      error
    );
    res
      .status(500)
      .send("An error occurred while updating the product quantity");
  }
});

router.put("/account/profile/edit-name", async (req, res) => {
  const { email, name } = req.body; // count will be either +1 or -1

  try {
    console.log(
      "Received request to update product quantity for email:",
      email
    );
    console.log("email to update:", email, "name:", name);

    const user = await schemas.Users.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    user.name = name;

    await user.save();
    console.log("User name updated successfully");
    res.status(200).send(user);
  } catch (error) {
    console.error("An error occurred while updating the user name:", error);
    res.status(500).send("An error occurred while updating the user name");
  }
});

module.exports = router;
