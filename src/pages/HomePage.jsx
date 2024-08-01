import Header from "../components/Header";
import ProductSwiper from "../components/ProductSwiper";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = ({ products, addToCart, updateWishlist, wishedItems }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const fetchUser = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/user?email=${email}`
      );
    } catch (error) {
      console.error("There was an error fetching the Users!", error);
    }
  };
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUser(user.email);
    }
  }, [isAuthenticated, user, wishedItems]);
  return (
    <div>
      <Header />
      <ProductSwiper
        heading={"Best Sellers in Footwear"}
        products={products}
        keywords={["Shoes", "Footwear"]}
        addToCart={addToCart}
        updateWishlist={updateWishlist}
        wishedItems={wishedItems}
      />
      <ProductSwiper
        heading={"Best Sellers in Cloths"}
        products={products}
        keywords={[
          "Shirt",
          "T-Shirt",
          "Sweater",
          "Hoodie",
          "Denim",
          "Jacket",
          "Sleepwear",
        ]}
        addToCart={addToCart}
        updateWishlist={updateWishlist}
        wishedItems={wishedItems}
      />
      <ProductSwiper
        heading={"Latest Tech-Wear for Coders"}
        products={products}
        keywords={["tech-wear"]}
        addToCart={addToCart}
        updateWishlist={updateWishlist}
        wishedItems={wishedItems}
      />
    </div>
  );
};

export default HomePage;
