import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Checkout = () => {
  const location = useLocation();
  const products = location.state[0];
  const currentUser = location.state[1];
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.address);
  const addresses = currentUser.addresses;
  const [showChangeAddress, setShowChangeAddress] = useState(false);
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
              <span className="flex gap-8 font-bold text-xl">
                <p>1</p>
                <p>Shipping address</p>
              </span>
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
        </div>
      </div>
    </div>
  );
};
export default Checkout;
