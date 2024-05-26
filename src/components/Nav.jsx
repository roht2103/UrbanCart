import logo from "../assets/urbancart.jpg";
import { IoSearch } from "react-icons/io5";
import { IoIosCart } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
const Nav = () => {
  const [cartCount, setCartCount] = useState(0);
  const searchItem = () => {
    alert("searched");
  };
  return (
    <div className="p-3 font-bold h-20 bg-black flex items-center justify-between">
      <img className="h-16 cursor-pointer" src={logo} alt="" />
      <section className="flex items-center">
        <span>
          <FaLocationDot style={{ color: "white", fontSize: "15px" }} />
        </span>
        <span className="text-white cursor-pointer">
          <p className="text-xs font-light">Delivering to</p>
          <p>Update Address</p>
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
      <section className="text-white cursor-pointer">
        <p className="text-xs">Hello, sign in</p>
        <p className="text-lg">Account</p>
      </section>
      <span className="flex items-center justify-center gap-1 cursor-pointer">
        <IoIosCart style={{ color: "white", fontSize: "40px" }} />
        <label className="text-white text-2xl font-light cursor-pointer">
          {cartCount}
        </label>
      </span>
    </div>
  );
};

export default Nav;
