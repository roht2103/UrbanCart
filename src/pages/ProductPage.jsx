import { Link, useNavigate, useLocation } from "react-router-dom";
const ProductPage = () => {
  const location = useLocation();
  const product = location.state;
  // console.log(product);
  return <h1>Product Page</h1>;
};
export default ProductPage;
