import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = ({ cart }) => {
  const [cartItems, setCartItems] = useState(cart);
  const [subtotal, setSubtotal] = useState(0);
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cart]);
  return (
    <div>
      {isAuthenticated && cartItems.length === 0 ? (
        <div className="bg-gray-100 m-5 px-3 py-10">
          <h1 className="text-4xl mb-2">Your UrbenCart Cart is empty</h1>
          <p>
            Your shopping cart lives to serve. Give it purpose - fill it with
            clothing and more.{" "}
          </p>
          <p>
            Continue shopping on <a href="/">UrbanCart</a>.{" "}
          </p>
        </div>
      ) : isAuthenticated && cartItems.length > 0 ? (
        <div className="bg-gray-100 m-5 px-3 py-7">
          <h1 className="text-3xl">Shopping Cart</h1>
          <hr className="mt-5" />
          <p className="text-xl">
            Subtotal ({cart.length} items): <b>{subtotal} $</b>
          </p>
          <hr className="mt-5" />
          {cart.map((product) => {
            return (
              <div key={product.key} className="flex mt-5 p-5">
                <div className="flex-shrink-0">
                  <img
                    src={"..//" + product.src}
                    className="w-40 h-40 object-cover rounded-lg cursor-pointer"
                    alt={product.name}
                    onClick={() => navigate("/product")}
                  />
                </div>
                <div className="ml-5 flex flex-col justify-between">
                  <div>
                    <p
                      className="text-2xl cursor-pointer font-semibold"
                      onClick={() => navigate("/product")}
                    >
                      {product.name}
                    </p>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-gray-600">
                      category: {product.category}
                    </p>
                  </div>
                  <div className="text-xl">
                    <button className="w-6 rounded bg-gray-200 m-1">-</button>
                    <label className="w-6 m-1">{product.quantity}</label>
                    <button className="w-6 rounded bg-gray-200 m-1">+</button>
                  </div>
                  <div className="flex items-center mt-4">
                    <p className="text-lg font-bold">{product.price} $</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-100 m-5 px-3 py-10">
          <h1 className="text-4xl mb-2">Your UrbenCart Cart is empty</h1>
          <Link to="/" className="text-blue-800">
            Shop todays Deals
          </Link>
          <br />
          <input
            className="bg-yellow-300 p-2 rounded-md cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              loginWithRedirect();
            }}
            type="button"
            name=""
            value="Sign in to your account"
          />
        </div>
      )}
      <p className="px-3 py-10 text-sm">
        The prices and availability of items at UrbanCart are subject to change.
        The Cart is a temporary place to store a list of your selected items,
        reflecting their most recent prices.
        <br /> Explore your Shopping Cart to learn more. Have a gift card or
        promotional code? We'll prompt you to enter your claim code during
        checkout.
      </p>
      <Footer />
    </div>
  );
};
export default CartPage;
