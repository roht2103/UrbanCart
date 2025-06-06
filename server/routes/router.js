const express = require("express");
const router = express.Router();
const schemas = require("../modules/schemas");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

// router.post("/user", async (req, res) => {
//   const { name, email, img, cartItems, wishlist, orders, addresses, address } =
//     req.body;
//   try {
//     // Check if user already exists
//     const existingUser = await schemas.Users.findOne({ email: email });

//     if (existingUser) {
//       return res.status(409).send("User already exists");
//     }

//     // Create new user if not exists
//     const newUser = new schemas.Users({
//       name,
//       email,
//       img,
//       cartItems,
//       wishlist,
//       orders,
//       addresses,
//       address,
//     });
//     await newUser.save();

//     res.status(201).send("User data posted successfully");
//   } catch (error) {
//     res.status(500).send("There was an error posting the user data!");
//     console.log(error);
//   }
// });

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
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("There was an error fetching the user data!");
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await schemas.Products.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("There was an error fetching the products!");
  }
});

router.put("/user/cart", async (req, res) => {
  const { email, product } = req.body;

  try {
    console.log("Received request to update cart for email:", email);
    console.log("Product to add:", product);

    const user = await schemas.Users.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const existingProductIndex = user.cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex > -1) {
      console.log("Product already in cart, updating quantity");
      // If product already exists in cart, update quantity
      user.cartItems[existingProductIndex].quantity += 1;
      console.log(existingProductIndex);
    } else {
      console.log("Product not in cart, adding new item");
      // If product does not exist in cart, add new item
      user.cartItems.push(product);
    }

    await user.save();
    console.log("Cart updated successfully");
    res.status(200).send(user);
  } catch (error) {
    console.error("An error occurred while updating the cart:", error);
    res.status(500).send("An error occurred while updating the cart");
  }
});

router.post("/add-to-orders", async (req, res) => {
  const { email, products } = req.body;

  try {
    const user = await schemas.Users.findOne({ email: email });

    user.orders.push(...products); // Flattening the products array to match orders schema
    await user.save();

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

router.post("/empty-cart", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await schemas.Users.findOne({ email: email });

    user.cartItems.splice(0, user.cartItems.length); // Flattening the products array to match orders schema
    await user.save();

    res.status(200).json({ message: "cart empty successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to empty cart" });
  }
});

router.put("/account/cart/quantity", async (req, res) => {
  const { email, product, count } = req.body;

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
      (item) => item.id === product.id
    );

    if (productIndex > -1) {
      console.log("Product found in cart, updating quantity");
      user.cartItems[productIndex].quantity += count;

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

router.put("/user/wishlist", async (req, res) => {
  const { email, product } = req.body;

  try {
    console.log("Received request to update wishlist for email:", email);
    console.log("Product to add:", product);

    const user = await schemas.Users.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const existingProductIndex = user.wishlist.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex > -1) {
      console.log("Product already in wishlist");
      console.log("Removing Product from wishlist");
      user.wishlist.splice(existingProductIndex, 1);
      res.send("Product removed from wishlist");
    } else {
      console.log("Product not in wishlist, adding new item");
      // If product does not exist in cart, add new item
      user.wishlist.push(product);
      res.send("Product added from wishlist");
    }

    await user.save();
    console.log("Wishlist updated successfully");
  } catch (error) {
    console.error("An error occurred while updating the wishlist:", error);
    res.status(500).send("An error occurred while updating the wishlist");
  }
});

router.put("/account/profile/edit-name", async (req, res) => {
  const { email, name } = req.body;

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

router.put("/account/profile/add-mobile", async (req, res) => {
  const { email, mobile } = req.body;

  try {
    console.log(
      "Received request to update product quantity for email:",
      email
    );
    console.log("email to update:", email, "mobile:", mobile);

    const user = await schemas.Users.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    user.mobile = mobile;

    await user.save();
    console.log("User mobile added successfully");
    res.status(200).send(user);
  } catch (error) {
    console.error("An error occurred while updating the user mobile:", error);
    res.status(500).send("An error occurred while updating the user mobiles");
  }
});

router.put("/account/addresses/add-new-address", async (req, res) => {
  const { email, address } = req.body;

  try {
    console.log("Received request to add address for email:", email);
    console.log("Address to add:", address);

    const user = await schemas.Users.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    console.log("adding new address");
    // If product does not exist in cart, add new item
    user.addresses.push(address);

    await user.save();
    console.log("address added successfully");
    res.status(200).send(user);
  } catch (error) {
    console.error("An error occurred while adding the address:", error);
    res.status(500).send("An error occurred while adding the address");
  }
});

router.put("/account/addresses/set-address", async (req, res) => {
  const { email, address } = req.body;
  try {
    console.log("Received request to set address for email:", email);
    console.log("Address to set:", address);

    const user = await schemas.Users.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    console.log("setting address");
    user.address = address;
    await user.save();
    console.log("address set successfully");
    res.status(200).send(user);
  } catch (error) {
    console.error("An error occurred while setting the address:", error);
    res.status(500).send("An error occurred while setting the address");
  }
});

router.delete("/account/addresses/remove-address", async (req, res) => {
  const { email, address } = req.body;
  try {
    console.log("Received request to remove address for email:", email);
    console.log("Address to remove:", address);

    const user = await schemas.Users.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const addressIndex = user.addresses.findIndex((addr) => {
      return addr._id.toString() === address._id;
    });

    const areAddressesEqual = (address1, address2) => {
      return (
        address1.country === address2.country &&
        address1.name === address2.name &&
        address1.phoneNo === address2.phoneNo &&
        address1.streetAddr === address2.streetAddr &&
        address1.city === address2.city &&
        address1.dist === address2.dist &&
        address1.state === address2.state &&
        address1.zipCode === address2.zipCode
      );
    };

    if (areAddressesEqual(address, user.address)) {
      console.log("Addresses are equal");
      if (user.addresses.length > 1) {
        user.address = user.addresses[0];
      } else {
        user.address = {};
      }
    } else {
      console.log("Addresses are not equal");
    }

    if (addressIndex > -1) {
      console.log("Address found in user, removing address");
      user.addresses.splice(addressIndex, 1); // Remove the address from the addresses array
      await user.save();
      console.log("Address removed successfully");
      res.send(user.addresses);
    } else {
      console.log("Address not found in user");
      res.status(404).send("Address not found in user");
    }
  } catch (error) {
    console.error("An error occurred while removing the address:", error);
    res.status(500).send("An error occurred while removing the address");
  }
});

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body; // Make sure you are receiving the products array from req.body

    // Map your products to Stripe's required format for line_items
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr", // Set your currency
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100, // Stripe expects the amount in cents/paise
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      // Correct usage of stripe object
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:5173/success", // Adjust to your actual success URL
      cancel_url: "http://localhost:5173/cancel", // Adjust to your actual cancel URL
    });

    res.json({ url: session.url }); // Return the session's URL to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
