import { Link, useNavigate } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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

const EmptyWishlist = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className="bg-gray-100 m-5 px-3 py-10 flex items-center gap-4">
      <IoHeartOutline className="text-6xl text-gray-400" />
      <div>
        {isAuthenticated ? (
          <>
            <h1 className="text-4xl mb-2">Your UrbanCart Wishlist is Empty</h1>
            <p className="text-lg mb-2">
              You haven't added any items to your wishlist yet.
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
            <h1 className="text-4xl mb-2">Your UrbanCart Wishlist</h1>
            <p className="text-lg mb-2">Sign in to see your wishlist items.</p>
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

const WishlistPage = ({ updateWishlist }) => {
  const [wishlistItems, setWishlist] = useState([]);
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const fetchUsers = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/user?email=${email}`
      );
      setWishlist(response.data[0].wishlist); // Assuming 'wishlist' is the correct field
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUsers(user.email);
    }
  }, [isAuthenticated, user, isLoading, wishlistItems]);

  return (
    <div className="bg-gray-100 p-5">
      {isAuthenticated ? (
        wishlistItems.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="flex flex-col gap-1 bg-gray-100">
            <h1 className="bg-white text-4xl p-3">My Wishlist</h1>
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white flex justify-between flex-wrap gap-5 p-5 cursor-pointer z-0"
              >
                <div
                  className="flex flex-wrap gap-5"
                  onClick={() => navigate("/product", { state: item })}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={`..\\${item.src}`}
                      className="w-40 h-40 object-cover"
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-2xl font-semibold">{item.name}</p>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                      <p className="text-gray-600">Category: {item.category}</p>
                    </div>
                    <div className="flex items-center mt-4">
                      <p className="text-lg font-bold">{item.price} $</p>
                    </div>
                  </div>
                </div>
                <div>
                  <MdDelete
                    className="text-gray-400 text-xl"
                    onClick={(e) => updateWishlist(e, item)}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
};

export default WishlistPage;
