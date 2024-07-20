import logo from "../assets/urbancart.jpg";
import { IoSearch } from "react-icons/io5";
import { IoIosCart } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { Popover } from "antd";

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

const Nav = () => {
  const { loginWithRedirect, logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [navAddr, setNavAddr] = useState(null);
  const [showUpdateAddressWindow, setShowUpdateAddressWindow] = useState(false);

  const searchItem = (event) => {
    event.preventDefault();
    alert("searched");
  };

  const fetchUsers = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/user?email=${email}`
      );
      const userData = response.data[0];
      setCurrentUser(userData);
      setCartCount(userData.cartItems.length);
      setNavAddr(userData.address);
      // console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the Users!", error);
    }
  };

  const postUser = async (userData) => {
    try {
      await axios.post("http://localhost:1000/user", userData);
    } catch (error) {
      console.error("There was an error posting the user data!", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUsers(user.email);
    }
  }, [isAuthenticated, user, currentUser]);

  useEffect(() => {
    if (isAuthenticated && user && !isUserLoading) {
      const userData = {
        name: user.name,
        email: user.email,
        img: user.picture,
        cartItems: [],
        wishlist: [],
        orders: [],
        addresses: [],
        address: "",
      };
      postUser(userData);
      setIsUserLoading(false);
    } else {
      setIsUserLoading(false);
    }
  }, [isAuthenticated, user, isUserLoading]);

  const content = (
    <div>
      {!isAuthenticated && (
        <section className="w-60 flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              loginWithRedirect();
            }}
            className="bg-yellow-300 p-2 rounded-md w-40"
          >
            Sign in
          </button>
        </section>
      )}
      <section className="w-60 p-2 flex flex-col">
        <hr />
        <h1 className="font-bold font-2xl">Your Account</h1>
        <Link
          to="/account"
          className="cursor-pointer hover:text-red-600 hover:underline"
        >
          Account
        </Link>
        <Link
          to="/account/orders"
          className="cursor-pointer hover:text-red-600 hover:underline"
        >
          Orders
        </Link>
        <Link
          to="/account/wishlist"
          className="cursor-pointer hover:text-red-600 hover:underline"
        >
          Wishlist
        </Link>
        {isAuthenticated && (
          <h5
            className="cursor-pointer hover:text-red-600 hover:underline"
            onClick={() => logout()}
          >
            Sign Out
          </h5>
        )}
      </section>
    </div>
  );

  return (
    <div>
      {showUpdateAddressWindow && currentUser && (
        <UpdateAddressWindow
          setShowUpdateAddressWindow={setShowUpdateAddressWindow}
          showUpdateAddressWindow={showUpdateAddressWindow}
          addresses={currentUser.addresses}
          activeAddress={currentUser.address}
          email={user.email}
        />
      )}
      <div className="p-3 font-bold h-15 bg-black flex items-center justify-between flex-wrap">
        <Link to="/">
          <img
            className="h-12 cursor-pointer"
            src={logo}
            alt="UrbanCart Logo"
          />
        </Link>
        <section className="flex items-center mt-2 md:mt-0">
          <span>
            <FaLocationDot style={{ color: "white", fontSize: "15px" }} />
          </span>
          <span
            className="text-white cursor-pointer ml-1"
            onClick={() => setShowUpdateAddressWindow(!showUpdateAddressWindow)}
          >
            {navAddr ? (
              <>
                <p className="text-xs font-light">
                  Delivering to {navAddr.name}
                </p>
                <p className="text-sm">
                  {`${navAddr.dist}, ${navAddr.zipCode}`}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-light">Delivering to</p>
                <p className="text-sm">Update Address</p>
              </>
            )}
          </span>
        </section>
        <form
          className="flex w-full md:w-3/5 mt-2 md:mt-0"
          onSubmit={searchItem}
        >
          <input
            className="h-10 p-3 rounded-l-md w-full outline-none font-medium"
            type="text"
            name="search"
            placeholder="Search UrbanCart"
          />
          <label
            htmlFor="search"
            className="bg-[#FFBD59] flex items-center justify-center h-10 w-10 rounded-r-md cursor-pointer"
          >
            <IoSearch style={{ fontSize: "30px" }} />
          </label>
          <input className="hidden" type="submit" id="search" />
        </form>
        <Popover content={content} trigger="hover">
          <section
            onClick={(e) => {
              e.preventDefault();
              !isAuthenticated && loginWithRedirect();
            }}
            className="text-white cursor-pointer gap-0 mt-2 md:mt-0"
          >
            <p className="text-xs font-light">
              Hello,
              {isLoading
                ? "Loading..."
                : isAuthenticated
                ? user.name
                : "sign in"}
            </p>
            <p className="text-sm">Account & Lists</p>
          </section>
        </Popover>
        <span
          onClick={() => navigate("/account/cart")}
          className="flex items-center justify-center gap-1 cursor-pointer mt-2 md:mt-0"
        >
          <IoIosCart style={{ color: "white", fontSize: "30px" }} />
          <label className="text-white text-xl font-light cursor-pointer">
            {cartCount}
          </label>
        </span>
      </div>
      <div className="font-bold h-15 bg-zinc-700 flex items-center text-white font-light flex-wrap">
        <p className="px-3 pb-0.5 pt-0.5 border-2 border-transparent hover:border-white cursor-pointer">
          All
        </p>
        <p className="px-3 pb-0.5 pt-0.5 border-2 border-transparent hover:border-white cursor-pointer">
          Mens
        </p>
        <p className="px-3 pb-0.5 pt-0.5 border-2 border-transparent hover:border-white cursor-pointer">
          Womens
        </p>
        <p className="px-3 pb-0.5 pt-0.5 border-2 border-transparent hover:border-white cursor-pointer">
          Childrens
        </p>
      </div>
    </div>
  );
};

export default Nav;
