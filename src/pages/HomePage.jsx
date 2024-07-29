import Header from "../components/Header";
import ProductSwiper from "../components/ProductSwiper";

const HomePage = ({ products, addToCart }) => {
  return (
    <div>
      <Header />
      <ProductSwiper
        heading={"Best Sellers in Footwear"}
        products={products}
        keywords={["Shoes", "Footwear"]}
        addToCart={addToCart}
      />
    </div>
  );
};

export default HomePage;
