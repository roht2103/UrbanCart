import Header from "../components/Header";
import ProductSwiper from "../components/ProductSwiper";

const HomePage = ({ products, addToCart, updateWishlist }) => {
  return (
    <div>
      <Header />
      <ProductSwiper
        heading={"Best Sellers in Footwear"}
        products={products}
        keywords={["Shoes", "Footwear"]}
        addToCart={addToCart}
        updateWishlist={updateWishlist}
      />
    </div>
  );
};

export default HomePage;
