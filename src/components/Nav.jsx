import logo from "../assets/urbancart.jpg";
import { IoSearch } from "react-icons/io5";
import { IoIosCart } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";

const Nav = (props) => {
  const { loginWithRedirect, logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const searchItem = (event) => {
    event.preventDefault();
    alert("searched");
  };

  const postUser = async (userData) => {
    try {
      const response = await axios.post("http://localhost:1000/user", userData);
      console.log("User data posted successfully", response.data);
    } catch (error) {
      console.error("There was an error posting the user data!", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
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
        setCurrentUser(userData);
        setIsUserLoading(false);
      } else {
        setIsUserLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated, user]);

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
            onClick={() => navigate("/account/address")}
          >
            <p className="text-xs font-light">Delivering to</p>
            <p className="text-sm">Update Address</p>
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
              Hello,{" "}
              {isUserLoading
                ? "Loading..."
                : isAuthenticated
                ? currentUser?.name
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
            {props.cartCount}
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
