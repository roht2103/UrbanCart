import logo from "../assets/urbancart.jpg";
import { IoSearch } from "react-icons/io5";
import { IoIosCart } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Popover } from "antd";
const Nav = () => {
  const [cartCount, setCartCount] = useState(0);
  const { loginWithRedirect, logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
  const searchItem = () => {
    alert("searched");
  };
  const content = (
    <div>
      {!isAuthenticated && (
        <section className="w-60 flex justify-center ">
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
      <section className="w-60 p-2">
        <hr />
        <h1 className="font-bold font-2xl">Your Account</h1>
        <h5 className="cursor-pointer hover:text-red-600 hover:underline">
          Account
        </h5>
        <h5 className="cursor-pointer hover:text-red-600 hover:underline">
          Orders
        </h5>
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
    <div className="p-3 font-bold h-15 bg-black flex items-center justify-between">
      <img className="h-12 cursor-pointer" src={logo} alt="" />
      <section className="flex items-end">
        <span>
          <FaLocationDot style={{ color: "white", fontSize: "15px" }} />
        </span>
        <span className="text-white cursor-pointer">
          <p className="text-xs font-light">Delivering to</p>
          <p className="text-sm">Update Address</p>
        </span>
      </section>
      <form className="flex w-3/5" onSubmit={() => searchItem()}>
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
        {/* <Button>Hover me</Button> */}
        <section
          onClick={(e) => {
            e.preventDefault();
            !isAuthenticated && loginWithRedirect();
          }}
          className="text-white cursor-pointer gap-0"
        >
          <p className="text-xs font-light">
            Hello, {!isAuthenticated ? "sign in" : user.name}
          </p>
          <p className="text-sm">Account & Lists</p>
        </section>
      </Popover>
      <span className="flex items-center justify-center gap-1 cursor-pointer">
        <IoIosCart style={{ color: "white", fontSize: "30px" }} />
        <label className="text-white text-xl font-light cursor-pointer">
          {cartCount}
        </label>
      </span>
    </div>
  );
};

export default Nav;
