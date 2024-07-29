import { Link, useNavigate } from "react-router-dom";
import { IoIosCart, IoIosHeart } from "react-icons/io";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const ProductSwiper = ({
  heading,
  products,
  keywords,
  addToCart,
  updateWishlist,
  wishedItems,
}) => {
  const navigate = useNavigate();
  console.log(wishedItems);
  return (
    <div className="m-2 p-5 bg-white">
      <h1 className="text-2xl font-semibold mb-5">{heading}</h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={5}
        navigation
        autoplay
        scrollbar={{ draggable: true }}
      >
        {products &&
          products.map((product) => {
            if (
              keywords.some((keyword) => product.keywords.includes(keyword))
            ) {
              const isWished = wishedItems.some(
                (item) => item.id === product.id
              );
              return (
                <SwiperSlide key={product._id}>
                  <div
                    key={product.id}
                    className="group relative border border-2 rounded-md mb-6 p-2 cursor-pointer"
                    onClick={() => navigate("/product", { state: product })}
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                      <IoIosCart
                        className="absolute text-white rounded-full p-2 right-5 top-5 text-5xl bg-[#eea83f96] z-50"
                        onClick={(e) => addToCart(e, product)}
                      />
                      <IoIosHeart
                        className={`absolute rounded-full p-2 right-5 top-20 text-5xl bg-[#eea83f96] z-50 ${
                          isWished ? "text-red-400" : "text-white"
                        }`}
                        onClick={(e) => updateWishlist(e, product)}
                      />
                      <img
                        alt={product.name}
                        src={"..\\" + product.src}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-md">{product.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.category}
                        </p>
                      </div>
                      <p className="text-md font-medium text-gray-900">
                        {product.price} $
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            } else {
              return null;
            }
          })}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
