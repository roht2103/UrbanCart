import { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div>
      {cartItems.length === 0 && (
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
