import Header from "../components/Header";
import ProductSwiper from "../components/ProductSwiper";

const HomePage = ({ products }) => {
  return (
    <div>
      <Header />
      <ProductSwiper
        heading={"Best Sellers in Footwear"}
        products={products}
        keywords={["Shoes", "Footwear"]}
      />
    </div>
  );
};

export default HomePage;
