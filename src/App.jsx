import Nav from "./components/Nav"; // Adjust the path if needed
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AddressPage from "./pages/AddressPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import AddAddress from "./pages/AddAddress";
import OrderDetailPage from "./pages/OrderDetailPage";
import Footer from "./components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishedItems, setWishedItems] = useState([]);

  const fetchUser = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/user?email=${email}`
      );
      setCurrentUser(response.data);
      // console.log(response.data[0]);
      setWishedItems(response.data[0].wishlist);
    } catch (error) {
      console.error("There was an error fetching the Users!", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:1000/products");
      setProducts(response.data);
      // console.log(response.data[135]);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUser(user.email);
    }
  }, [isAuthenticated, user, wishedItems]);
  // useEffect(() => {
  //   if (currentUser) {
  //     fetchUser(currentUser.email);
  //   }
  // }, [currentUser]);
  const addToCart = async (product) => {
    try {
      const response = await axios.put("http://localhost:1000/user/cart", {
        email: user.email,
        product: product,
      });
      alert("Product added to cart");
    } catch (error) {
      console.error(
        "There was an error adding the product to the cart!",
        error
      );
    }
  };
  const updateWishlist = async (product) => {
    try {
      const response = await axios.put("http://localhost:1000/user/wishlist", {
        email: user.email,
        product: product,
      });
      alert(response.data);
    } catch (error) {
      console.error(
        "There was an error adding the product to the wishlist!",
        error
      );
    }
  };
  return (
    <div className="bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <div className="">
                <Nav />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <HomePage
                        products={products}
                        addToCart={addToCart}
                        updateWishlist={updateWishlist}
                        wishedItems={wishedItems}
                      />
                    }
                  />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/account/orders" element={<OrdersPage />} />
                  <Route
                    path="/account/cart"
                    element={<CartPage currentUser={currentUser} />}
                  />
                  <Route
                    path="/account/wishlist"
                    element={
                      <WishlistPage
                        currentUser={currentUser}
                        updateWishlist={updateWishlist}
                      />
                    }
                  />
                  <Route path="/account/address" element={<AddressPage />} />
                  <Route
                    path="/account/profile"
                    element={<ProfilePage currentUser={currentUser} />}
                  />
                  <Route
                    path="/account/addresses/add-new-address"
                    element={<AddAddress currentUser={currentUser} />}
                  />
                  <Route
                    path="/product"
                    element={
                      <ProductPage
                        addToCart={addToCart}
                        updateWishlist={updateWishlist}
                        wishedItems={wishedItems}
                      />
                    }
                  />
                  <Route
                    path="/account/orders/order-details"
                    element={<OrderDetailPage />}
                  />
                </Routes>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
