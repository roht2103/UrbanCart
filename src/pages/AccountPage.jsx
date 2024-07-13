import account from "../assets/account.png";
import address from "../assets/address.png";
import orders from "../assets/orders.png";
import wishlist from "../assets/wishlist.png";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const AccountPage = () => {
  const Navigate = useNavigate();
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 md:p-4 w-full lg:w-4/6 md:w-5/6">
        <h1 className="text-2xl md:text-3xl">Your Account</h1>
        <section
          name="container"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2"
        >
          <section
            onClick={() =>
              isAuthenticated
                ? Navigate("/account/profile")
                : loginWithRedirect()
            }
            className="cursor-pointer flex items-center gap-4 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100"
          >
            <span>
              <img
                className="h-16 min-w-16 rounded-full"
                src={account}
                alt=""
              />
            </span>
            <span>
              <h1 className="text-xl">Your Profile</h1>
              <p>Manage your account details.</p>
            </span>
          </section>
          <section
            onClick={() => Navigate("/account/orders")}
            className="cursor-pointer flex items-center gap-4 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100"
          >
            <span>
              <img className="h-16 min-w-16 rounded-full" src={orders} alt="" />
            </span>
            <span>
              <h1 className="text-xl">Your Orders</h1>
              <p>
                Track, return, cancel an order, download invoice or buy again.
              </p>
            </span>
          </section>
          <section
            onClick={() => Navigate("/account/wishlist")}
            className="cursor-pointer flex items-center gap-4 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100"
          >
            <span>
              <img
                className="h-16 min-w-16 rounded-full"
                src={wishlist}
                alt=""
              />
            </span>
            <span>
              <h1 className="text-xl">Your Wishlist</h1>
              <p>View and manage your wishlist.</p>
            </span>
          </section>
          <section
            onClick={() => Navigate("/account/address")}
            className="cursor-pointer flex items-center gap-4 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100"
          >
            <span>
              <img
                className="h-16 min-w-16 rounded-full"
                src={address}
                alt=""
              />
            </span>
            <span>
              <h1 className="text-xl">Your Addresses</h1>
              <p>Edit, remove or set default address.</p>
            </span>
          </section>
          <section
            onClick={() => Navigate("/account/cart")}
            className="cursor-pointer flex items-center gap-4 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100"
          >
            <span>
              <img
                className="h-16 min-w-16 rounded-full"
                src={account}
                alt=""
              />
            </span>
            <span>
              <h1 className="text-xl">Your Cart</h1>
              <p>Details of the cart item.</p>
            </span>
          </section>
        </section>
      </div>
      <Footer />
    </div>
  );
};
export default AccountPage;
