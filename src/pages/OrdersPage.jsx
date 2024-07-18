import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animation from "../assets/animations/loading.json";
import { Link, useNavigate } from "react-router-dom";

const list = [
  {
    id: 4,
    name: "HTML T-Shirt",
    price: 39,
    deliveryDate: "12/23/2024",
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
  },
  {
    id: 5,
    name: "Java T-Shirt",
    price: 39,
    deliveryDate: "12/23/2024",
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
  },
];

const OrdersPage = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [orderList, setOrderList] = useState(list);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (
  //     props.currentUser &&
  //     props.currentUser.orders &&
  //     props.currentUser.orders.length > 0
  //   ) {
  //     setOrderList(props.currentUser.orders);
  //   }
  // }, [props.currentUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-36">
        <Lottie animationData={animation} className="h-24" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl m-5 mb-0 px-3">Your Orders</h1>
      <hr className="md:m-5 m-1" />

      {isAuthenticated && orderList.length === 0 ? (
        <div className="m-5 px-3 py-10">
          <h1 className="text-4xl mb-2">
            Looks like you haven&apost placed any orders yet.
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
        <div className="md:m-5 px-3 py-10">
          {isAuthenticated ? (
            orderList.map((product) => (
              <div
                key={product.id}
                className="bg-gray-100 flex justify-between flex-wrap gap-5 mb-3 p-5"
              >
                <div className="flex flex-wrap gap-5">
                  <div className="flex-shrink-0">
                    <img
                      src={`..\\${product.src}`} // Adjust path to correctly display image
                      className="w-40 h-40 object-cover cursor-pointer"
                      alt={product.name}
                      onClick={() => navigate("/product", { state: product })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <p
                        className="text-2xl cursor-pointer font-semibold"
                        onClick={() => navigate("/product", { state: product })}
                      >
                        {product.name}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {product.description}
                      </p>
                      <p className="text-gray-600">
                        Category: {product.category}
                      </p>
                    </div>
                    <div className="flex items-center mt-4">
                      <p className="text-lg font-bold">{product.price} $</p>
                    </div>
                    <Link to="/buy" state={product}>
                      Buy again
                    </Link>
                  </div>
                </div>
                <div>
                  <p className="font-bold">
                    Delivered on {product.deliveryDate}
                  </p>
                  <p className="text-xs">Your item has been delivered</p>
                </div>
              </div>
            ))
          ) : (
            <h1>sign in</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
