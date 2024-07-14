import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animation from "../assets/animations/loading.json";
import { Link, useNavigate } from "react-router-dom";

const OrdersPage = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { orderList, setOrderList } = useState([]);
  useEffect(() => {
    if (props.currentUser && props.currentUser.length > 0) {
      setOrderList(props.currentUser[0].orders);
      console.log(props.currentUser);
    }
  }, [props.currentUser]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-36">
        <Lottie animationData={animation} className="h-24" />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-4xl m-5 px-3">Your Orders</h1>

      {isAuthenticated && !orderList ? (
        <div className="m-5 px-3 py-10">
          <h1 className="text-4xl mb-2">
            Looks like you didn't place any orders.
          </h1>
          <p>
            Once you place an order, you'll see your order history here. You can
            track, return, or buy again from your order list.
          </p>
          <p className="text-center mt-10 my-2">
            Continue shopping on{" "}
            <Link className="text-blue-700 underline" to="/">
              UrbanCart
            </Link>{" "}
            to find items you love.
          </p>
        </div>
      ) : (
        <div className="bg-gray-100 m-5 px-3 py-10"></div>
      )}
    </div>
  );
};
export default OrdersPage;
