import { Link, useNavigate, useLocation } from "react-router-dom";

const OrderDetailPage = () => {
  const location = useLocation();
  const product = location.state;
  console.log(product);
  const navigate = useNavigate();
  return (
    <div className="m-5 md:mx-20">
      <div className="bg-gray-100 flex justify-between flex-wrap gap-x-48 gap-y-7 mb-3 p-5">
        <div className="flex flex-col flex-wrap gap-2">
          <p className="text-xl font-semibold">Delivery address</p>
          <p className="text=lg font-semibold">{product.address["name"]}</p>
          <span>
            <p>{product.address.streetAddr},</p>
            <p>{`${product.address.zipCode}, ${product.address.streetAddr}, ${product.address.city}, ${product.address.dist},`}</p>
            <p>{`${product.address.state}, ${product.address.zipCode}`}</p>
          </span>
          <p>
            <b className="font-semibold">Phone number &nbsp;&nbsp;&nbsp;</b>
            {product.address.phoneNo}
          </p>
        </div>
        <div className="flex flex-col flex-wrap w-1/2">
          <span className="flex gap-3">
            <p className="text-emerald-600 font-medium">Order ID</p>
            <p>{product.orderId}</p>
          </span>
          <span className="flex gap-3">
            <p className="text-emerald-600 font-medium">Order date</p>
            <p>{product.orderDate}</p>
          </span>
          <span className="flex gap-3">
            <p className="text-emerald-600 font-medium">Order confirmed date</p>
            <p>{product.orderConfirmDate}</p>
          </span>
          <span className="flex gap-3">
            <p className="text-emerald-600 font-medium">Delivered date</p>
            <p>{product.deliveryDate}</p>
          </span>
        </div>
      </div>
      <div className="bg-gray-100 flex justify-between flex-wrap gap-5 mb-3 p-5">
        <div className="flex flex-wrap gap-5">
          <div className="flex-shrink-0">
            <img
              src={`..\\..\\${product.src}`}
              className="w-40 h-40 object-cover cursor-pointer"
              alt={product.name}
              onClick={() => navigate("/product", { state: product })}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p
                className="text-2xl font-semibold cursor-pointer"
                onClick={() => navigate("/product", { state: product })}
              >
                {product.name}
              </p>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-gray-600">Category: {product.category}</p>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-lg font-bold">{product.price} $</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold">Delivered on {product.deliveryDate}</p>
          <p className="text-xs">Your item has been delivered</p>
        </div>
      </div>
    </div>
  );
};
export default OrderDetailPage;
