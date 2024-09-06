import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
const Checkout = () => {
  const location = useLocation();
  const products = location.state[0];
  const subtotal = location.state[1];
  const currentUser = location.state[2];
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.address);
  const addresses = currentUser.addresses;
  const [showChangeAddress, setShowChangeAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const checkout = async () => {
    if (paymentMethod === "cashOnDelivery") {
      navigate("/success");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:1000/create-checkout-session",
          {
            products,
            subtotal,
          }
        );
        console.log(res.data.url);

        window.location = res.data.url; // Redirect to the checkout URL
      } catch (error) {
        console.error("Checkout error:", error.response.data);
      }
    }
  };
  return (
    <div className="bg-white">
      <p className="text-center text-3xl bg-gray-200 p-5">
        Checkout (
        <span className="text-cyan-700 text-2xl">{products.length} items</span>)
      </p>
      <div className="flex flex-col bg-white items-center justify-center">
        <div className="p-2 md:p-4 w-full lg:w-4/6 md:w-5/6">
          {showChangeAddress ? (
            <section className="flex flex-col">
              <span className="flex justify-between items-center">
                <span className="flex gap-8 font-bold text-red-700 text-xl">
                  <p>1</p>
                  <p>Choose a shipping address</p>
                </span>
                <RxCross2
                  className="font-bold text-2xl cursor-pointer"
                  onClick={() => setShowChangeAddress(false)}
                />
              </span>
              <form
                className="border-2 ml-10 mt-3 p-4 rounded-lg"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowChangeAddress(false);
                }}
              >
                <p>Your addresses</p>
                <hr className="my-2" />
                {addresses.map((address) => (
                  <label key={address.streetAddr} className="flex">
                    <input
                      type="radio"
                      onChange={() => setDeliveryAddress(address)}
                      name="address"
                      value={address.streetAddr}
                      className="mr-2"
                    />
                    <p className="font-semibold">{address.name}</p>,{" "}
                    {address.streetAddr}, {address.city}, {address.dist},{" "}
                    {address.state}, {address.zipCode}, {address.country}
                  </label>
                ))}
                <Link
                  className="text-cyan-700 text-sm flex items-center gap-2"
                  to="/account/addresses/add-new-address"
                >
                  <p className="text-3xl text-gray-300 font-bold">+</p>
                  <p className="mt-1 hover:text-red-600 hover:underline">
                    Add a new address
                  </p>
                </Link>
                <input
                  type="submit"
                  className="bg-[#FFBD59] px-4 py-2 rounded-full text-md font-semibold my-3 cursor-pointer"
                  value="Use this address"
                />
              </form>
            </section>
          ) : (
            <section className="flex justify-between items-start">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-700">1</span>
                <span>Shipping address</span>
              </h2>
              <span>
                <p>{deliveryAddress.name}</p>
                <p>
                  {deliveryAddress.streetAddr}, {deliveryAddress.city}
                </p>
                <p>
                  {deliveryAddress.dist}, {deliveryAddress.state}
                </p>
                <p>
                  {deliveryAddress.state}, {deliveryAddress.country},{" "}
                  {deliveryAddress.zipCode}
                </p>
              </span>
              <button
                className="text-cyan-700"
                onClick={() => setShowChangeAddress(true)}
              >
                Change
              </button>
            </section>
          )}
          <hr className="my-4" />
          <section className="w-full bg-gray-50 p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-cyan-700">2</span>
              <span>Price Details</span>
            </h2>
            <table className="w-full text-sm md:text-lg">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="px-4 py-2 text-left font-semibold">Product</th>
                  <th className="px-4 py-2 text-left font-semibold">Price</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200">
                    <td className="px-4 py-2 flex flex-wrap items-center gap-2">
                      <img
                        src={product.src}
                        className="h-16 w-16 object-cover rounded"
                        alt={product.name}
                      />
                      <span>{product.name}</span>
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {product.price} ₹
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {product.price * product.quantity} ₹
                    </td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td className="px-4 py-2" colSpan="3">
                    Total MRP
                  </td>
                  <td className="px-4 py-2">{subtotal} ₹</td>
                </tr>
                <tr className="font-semibold">
                  <td className="px-4 py-2" colSpan="3">
                    Delivery Charges
                  </td>
                  <td className="px-4 py-2">4 ₹</td>
                </tr>
                <tr className="font-semibold text-lg">
                  <td className="px-4 py-2" colSpan="3">
                    Total
                  </td>
                  <td className="px-4 py-2">{subtotal + 4} ₹</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="w-full bg-gray-50 p-4 mt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-cyan-700">3</span>
              <span>Payment Method</span>
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  onChange={() => setPaymentMethod("cashOnDelivery")}
                  className="form-radio text-cyan-700"
                />
                <span className="text-gray-800">Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cards"
                  onChange={() => setPaymentMethod("cards")}
                  className="form-radio text-cyan-700"
                />
                <span className="text-gray-800">Card</span>
              </label>
              {/* Add more payment options here if needed */}
            </div>
          </section>

          <section className="flex w-full justify-center">
            <button
              className="bg-[#FFBD59] text-black py-1 px-10 rounded-full text-md"
              onClick={() =>
                paymentMethod === null
                  ? toast.warning("Select payment method")
                  : checkout()
              }
            >
              Place Order
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
