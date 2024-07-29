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

  return (
    <div className="m-2 p-5 bg-white">
      <h1 className="text-2xl font-semibold mb-5">{heading}</h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          420: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
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
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 h-64">
                      <IoIosCart
                        className={`absolute rounded-full p-1 md:p-2 right-2 md:right-5 top-2 md:top-5 text-3xl md:text-5xl bg-[#eea83f96] z-50 ${
                          wishedItems.includes(product)
                            ? "text-red-700"
                            : "text-white"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      />
                      <IoIosHeart
                        className={`absolute rounded-full p-1 md:p-2 right-2 md:right-5 top-10 md:top-20 text-3xl md:text-5xl bg-[#eea83f96] z-50 ${
                          isWished ? "text-red-400" : "text-white"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateWishlist(product);
                        }}
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
