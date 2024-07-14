import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import animation from "../assets/animations/loading.json";

const CartPage = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Ensure currentUser is defined and has cartItems before setting state
  useEffect(() => {
    if (props.currentUser && props.currentUser.length > 0) {
      setCartItems(props.currentUser[0].cartItems);
      // console.log(props.currentUser);
    }
  }, [props.currentUser]);
  // Calculate subtotal whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const updateQuantity = async (product, count) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/account/cart/quantity",
        {
          email: user.email,
          product: product,
          count: count,
        }
      );
      // Handle response as needed
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-36">
        <Lottie animationData={animation} className="h-28" />
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated && cartItems.length === 0 ? (
        <div className="bg-gray-100 m-5 px-3 py-10">
          <h1 className="text-4xl mb-2">Your UrbanCart Cart is empty</h1>
          <p>
            Your shopping cart lives to serve. Give it purpose - fill it with
            clothing and more.
          </p>
          <p>
            Continue shopping on <Link to="/">UrbanCart</Link>.
          </p>
        </div>
      ) : isAuthenticated && cartItems.length > 0 ? (
        <div className="bg-gray-100 m-5 px-3 py-7">
          <h1 className="text-3xl">Shopping Cart</h1>
          <hr className="mt-5" />
          <p className="text-xl">
            Subtotal ({cartItems.length} items): <b>{subtotal} $</b>
          </p>
          <hr className="mt-5" />
          {cartItems.map((product) => (
            <div key={product.key} className="flex mt-5 p-5">
              <div className="flex-shrink-0">
                <img
                  src={`..\\${product.src}`} // Adjust path to correctly display image
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
                  <p className="text-gray-600">Category: {product.category}</p>
                </div>
                <div className="text-xl">
                  <button
                    onClick={() => updateQuantity(product, -1)}
                    className="w-6 rounded bg-gray-200 m-1"
                  >
                    -
                  </button>
                  <label className="w-6 m-1">{product.quantity}</label>
                  <button
                    onClick={() => updateQuantity(product, 1)}
                    className="w-6 rounded bg-gray-200 m-1"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center mt-4">
                  <p className="text-lg font-bold">{product.price} $</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 m-5 px-3 py-10">
          <h1 className="text-4xl mb-2">Your UrbanCart Cart is empty</h1>
          <Link to="/" className="text-blue-800">
            Shop today's Deals
          </Link>
          <br />
          <input
            className="bg-yellow-300 p-2 rounded-md cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              loginWithRedirect();
            }}
            type="button"
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
    </div>
  );
};

export default CartPage;
