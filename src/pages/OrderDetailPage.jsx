import { Link, useNavigate, useLocation } from "react-router-dom";

const OrderDetailPage = () => {
  const location = useLocation();
  const product = location.state;
  return (
    <div>
      <h1>Order Detail Page</h1>
    </div>
  );
};
export default OrderDetailPage;
