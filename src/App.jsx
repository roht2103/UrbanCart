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
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
const cart = [
  {
    id: 1,
    name: "C++ Hoodie",
    quantity: 2,
    price: 49,
    src: "public\\images\\cplusplus.jpg",
    category: "Hoodie",
    gender: "Male",
    description:
      "Stay warm and stylish with this C++ Hoodie, perfect for any programming enthusiast.",
    keywords: [
      "C++",
      "Hoodie",
      "Programming",
      "Male",
      "Winter",
      "Sweatshirt",
      "Fashion",
      "Casual",
    ],
  },
  {
    id: 2,
    name: "CSS Sweater",
    quantity: 1,
    price: 49,
    src: "public\\images\\css.jpg",
    category: "Sweater",
    gender: "Female",
    description:
      "Embrace your love for web development with this cozy CSS Sweater, designed for comfort and style.",
    keywords: [
      "CSS",
      "Sweater",
      "Web Development",
      "Female",
      "Winter",
      "Knitted",
      "Fashion",
      "Casual",
    ],
  },
  {
    id: 3,
    name: "GitHub Mask",
    quantity: 1,
    price: 19,
    src: "public\\images\\github.jpg",
    category: "Mask",
    gender: "Unisex",
    description:
      "Show off your GitHub pride while staying safe with this reusable GitHub Mask.",
    keywords: [
      "GitHub",
      "Mask",
      "Coding",
      "Unisex",
      "Face Mask",
      "Safety",
      "Reusable",
      "Comfortable",
    ],
  },
  {
    id: 4,
    name: "HTML T-Shirt",
    quantity: 1,
    price: 39,
    src: "public\\images\\html.jpg",
    category: "T-Shirt",
    gender: "Male",
    description:
      "This HTML T-Shirt is a must-have for any web developer, combining comfort with a love for coding.",
    keywords: [
      "HTML",
      "T-Shirt",
      "Web Development",
      "Male",
      "Summer",
      "Cotton",
      "Fashion",
      "Casual",
    ],
  },
];
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = useState();
  const fetchUser = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/user?email=${email}`
      );
      setCurrentUser(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the Users!", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUser(user.email);
    }
  }, [isAuthenticated, user]);
  // useEffect(() => {
  //   if (currentUser) {
  //     fetchUser(currentUser.email);
  //   }
  // }, [currentUser]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <div className="">
                <Nav
                  currentUser={currentUser}
                  cartCount={isAuthenticated ? cart.length : 0}
                />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/account/orders" element={<OrdersPage />} />
                  <Route
                    path="/account/cart"
                    element={<CartPage cart={cart} />}
                  />
                  <Route path="/account/wishlist" element={<WishlistPage />} />
                  <Route path="/account/address" element={<AddressPage />} />
                  <Route
                    path="/account/profile"
                    element={<ProfilePage currentUser={currentUser} />}
                  />
                  <Route path="/product" element={<ProductPage />} />
                </Routes>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
