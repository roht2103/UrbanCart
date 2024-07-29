import { useNavigate, useLocation } from "react-router-dom";
import { IoIosCart, IoIosHeart } from "react-icons/io";
import { useState } from "react";
import RatingSection from "../components/RatingSection ";
const ProductPage = ({ addToCart, updateWishlist, wishedItems }) => {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(product.src);

  const isWished = wishedItems.some((item) => item.id === product.id);

  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <div className="p-2 md:p-4 w-full lg:w-4/6 md:w-5/6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="flex flex-col">
            <img
              src={"..\\" + selectedImage}
              alt={product.name}
              className="w-full h-auto mb-4 rounded-md"
            />
            <div className="flex space-x-2">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={"..\\" + image}
                  alt={`Product ${index}`}
                  className="w-16 h-16 object-cover cursor-pointer rounded-md"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-700">{product.description}</p>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold text-black">Category:</span>{" "}
              {product.category}
            </p>
            <p className="text-2xl font-semibold text-gray-900 mb-4">
              Price: {product.price}$
            </p>
            <div className="flex space-x-4 mb-4">
              <button
                className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                onClick={() => addToCart(product)}
              >
                <IoIosCart className="mr-2" /> Add to Cart
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-md ${
                  isWished
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } hover:bg-red-600`}
                onClick={() => updateWishlist(product)}
              >
                <IoIosHeart className="mr-2" />{" "}
                {isWished ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
            {/* Additional product info can go here */}
          </div>
        </div>
        <RatingSection rating={3} totalRatings={4} />
      </div>
    </div>
  );
};

export default ProductPage;
