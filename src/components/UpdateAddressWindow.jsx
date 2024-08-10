import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const UpdateAddressWindow = ({
  showUpdateAddressWindow,
  setShowUpdateAddressWindow,
  addresses,
  activeAddress,
  email,
}) => {
  // Function to compare if two addresses are the same
  const isSameAddress = (address1, address2) => {
    return (
      address1.streetAddr === address2.streetAddr &&
      address1.city === address2.city &&
      address1.dist === address2.dist &&
      address1.state === address2.state &&
      address1.zipCode === address2.zipCode &&
      address1.country === address2.country &&
      address1.name === address2.name &&
      address1.phoneNo === address2.phoneNo
    );
  };
  const [isUpdating, setIsUpdating] = useState(false);
  const updateAddress = async (address) => {
    try {
      setIsUpdating(true);
      await axios.put("http://localhost:1000/account/addresses/set-address", {
        email: email,
        address: address,
      });
      setIsUpdating(false);
      alert("Address set successfully");
    } catch (error) {
      console.error("There was an error setting the address!", error);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 2xl:w-[27%] lg:w-[33%] md:w-[45%] sm:w-[60%] w-[80%] shadow-lg">
      <section className="bg-gray-200 rounded-t-lg px-5 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Choose your location</h1>
        <RxCross2
          onClick={() => setShowUpdateAddressWindow(!showUpdateAddressWindow)}
          className={`text-2xl font-bolder cursor-pointer ${
            isUpdating && "cursor-wait"
          }`}
        />
      </section>
      <section className="bg-white rounded-b-lg px-5 py-4 flex flex-col items-center justify-between gap-4">
        <p className="text-sm">
          Delivery options and delivery speed may vary for different locations
        </p>
        <span className="w-full flex flex-col gap-2">
          {addresses &&
            addresses.length > 0 &&
            addresses.map((address) => (
              <p
                key={address._id}
                className={`px-3 py-2 text-md border-2 border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  isUpdating && "cursor-wait"
                } ${
                  activeAddress && isSameAddress(address, activeAddress)
                    ? "bg-cyan-50 border-4 border-cyan-900"
                    : ""
                }`}
                onClick={() =>
                  activeAddress &&
                  !isSameAddress(address, activeAddress) &&
                  updateAddress(address)
                }
              >
                <span className="font-bold">{address.name + " "}</span>
                {`${address.streetAddr}, ${address.city}, ${address.dist}, ${address.state}, ${address.zipCode}`}
              </p>
            ))}
          <Link
            onClick={() => setShowUpdateAddressWindow(!showUpdateAddressWindow)}
            to="/account/address"
            className={`text-cyan-800 text-semibold ${
              isUpdating && "cursor-wait"
            }`}
          >
            Manage Address book
          </Link>
          <input
            disabled={isUpdating}
            type="button"
            className={`place-self-end w-fit mt-3 bg-[#FFBD59] py-1 px-2 rounded-md right-0 cursor-pointer ${
              isUpdating && "cursor-wait"
            }`}
            value="Done"
            onClick={() => setShowUpdateAddressWindow(!showUpdateAddressWindow)}
          />
        </span>
      </section>
    </div>
  );
};
export default UpdateAddressWindow;
