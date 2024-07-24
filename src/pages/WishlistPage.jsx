import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";

const EmptyWishlist = () => {
  return (
    <div className="bg-gray-100 m-5 px-3 py-10 flex items-center gap-4">
      <IoHeartOutline className="text-6xl text-gray-400" />
      <div>
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
      </div>
    </div>
  );
};
const WishlistPage = () => {
  return <EmptyWishlist />;
};
export default WishlistPage;
