import { Link, useNavigate } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Lottie from "lottie-react";
import animation from "../assets/animations/loading.json";
const list = [
  {
    id: 4,
    name: "HTML T-Shirt",
    price: 39,
    orderDate: "12/23/2024",
    orderConfirmDate: "12/23/2024",
    deliveryDate: "12/23/2024",
    orderId: "SD234KJKL2435K32",
    src: "public\\images\\html.jpg",
    category: "T-Shirt",
    gender: "Male",
    description:
      "This HTML T-Shirt is a must-have for any web developer, combining comfort with a love for coding.",
    keywords: [
      "HTML",
      "T-Shirt",
      "Web Development",
      "Male",
      "Summer",
      "Cotton",
      "Fashion",
      "Casual",
    ],
    address: {
      country: "India",
      name: "Rohit Thorat",
      phoneNo: 8080863573,
      streetAddr: "Panchale",
      city: "Sinner",
      dist: "Nashik",
      state: "Maharashtra",
      zipCode: 422104,
    },
  },
  {
    id: 5,
    name: "Java T-Shirt",
    price: 39,
    orderDate: "12/23/2024",
    orderConfirmDate: "12/23/2024",
    deliveryDate: "12/23/2024",
    orderId: "SD234KJKL2435K34",
    src: "public\\images\\java.jpg",
    category: "T-Shirt",
    gender: "Female",
    description:
      "Wear your passion for programming with this Java T-Shirt, perfect for casual outings.",
    keywords: [
      "Java",
      "T-Shirt",
      "Programming",
      "Female",
      "Summer",
      "Cotton",
      "Fashion",
      "Casual",
    ],
    address: {
      country: "India",
      name: "Rohit Thorat",
      phoneNo: 8080863573,
      streetAddr: "Panchale",
      city: "Sinner",
      dist: "Nashik",
      state: "Maharashtra",
      zipCode: 422104,
    },
  },
];
const EmptyOrders = ({ isAuthenticated, loginWithRedirect }) => {
  return (
    <div className="bg-gray-100 m-5 px-3 py-10 flex items-center gap-4">
      <div>
        {isAuthenticated ? (
          <>
            <h1 className="text-4xl mb-2">
              Looks like you haven't placed any orders yet.
            </h1>
            <p className="text-lg mb-2">
              Once you place an order, you'll see your order history here. You
              can track, return, or buy again from your order list.
            </p>
            <p className="text-lg">
              Continue shopping on{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                UrbanCart
              </Link>
              .
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl mb-2">Your UrbanCart Orders</h1>
            <p className="text-lg mb-2">Sign in to see your orders.</p>
            <button
              onClick={() => loginWithRedirect()}
              className="bg-yellow-300 p-2 rounded-md text-lg mt-2"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const [orderList, setOrderList] = useState([]);
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const fetchOrders = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/user?email=${email}`
      );
      setOrderList(response.data[0].orders); // Assuming 'orders' is the correct field
    } catch (error) {
      console.error("There was an error fetching the orders!", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchOrders(user.email);
    }
  }, [isAuthenticated, user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-36">
        <Lottie animationData={animation} className="h-24" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-5">
      {orderList.length === 0 ? (
        <EmptyOrders
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
        />
      ) : (
        <div className="flex flex-col gap-1 bg-gray-100">
          <h1 className="bg-white text-4xl p-3">My Orders</h1>
          {orderList.map((order) => (
            <div
              key={order.id}
              className="bg-white flex justify-between flex-wrap gap-5 p-5 cursor-pointer z-0"
              onClick={() =>
                navigate("/account/orders/order-details", { state: order })
              }
            >
              <div className="flex flex-wrap gap-5">
                <div className="flex-shrink-0">
                  <img
                    src={`..\\${order.src}`}
                    className="w-40 h-40 object-cover"
                    alt={order.name}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-2xl font-semibold">{order.name}</p>
                    <p className="text-gray-600 mt-2">{order.description}</p>
                    <p className="text-gray-600">Category: {order.category}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <p className="text-lg font-bold">{order.price} $</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold">Delivered on {order.deliveryDate}</p>
                <p className="text-xs">Your item has been delivered</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
