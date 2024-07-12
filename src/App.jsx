import Nav from "./components/Nav"; // Adjust the path if needed
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AddressPage from "./pages/AddressPage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Nav />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/account/orders" element={<OrdersPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/account/wishlist" element={<WishlistPage />} />
                  <Route path="/account/address" element={<AddressPage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
