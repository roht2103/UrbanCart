import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// const addr = [
//   {
//     country: "India",
//     name: "Rohit Thorat",
//     phoneNo: 8080863573,
//     streetAddr: "Panchale",
//     city: "Sinner",
//     dist: "Nashik",
//     state: "Maharashtra",
//     zipCode: 422103,
//   },
// ];
const AddressPage = () => {
  const [currUser, setCurrUser] = useState();
  const [addresses, setAddresses] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (props.currentUser && props.currentUser.length > 0) {
  //     setCurrUser(props.currentUser[0]);
  //     setAddresses(props.currentUser[0].addresses);
  //   }
  // }, [props.currentUser, addresses]);
  const fetchUsers = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/user?email=${email}`
      );
      setCurrUser(response.data[0]);
      setAddresses(response.data[0].addresses);
    } catch (error) {
      console.error("There was an error fetching the Users!", error);
    }
  };
  useEffect(() => {
    isAuthenticated && fetchUsers(user.email);
  }, [isLoading]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 md:p-4 w-full lg:w-4/6 md:w-5/6">
        <h1 className="text-2xl md:text-3xl my-5">Your Addresses</h1>
        <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
          <section
            onClick={() => navigate("/account/addresses/add-new-address")}
            className="border-2 border-slate-300 border-dashed flex flex-col items-center justify-center w-72 md:h-72 py-3 rounded-lg cursor-pointer"
          >
            <FaPlus className="text-gray-300 text-5xl" />
            <p className="text-gray-500 text-3xl font-semibold">Add Address</p>
          </section>
          {isAuthenticated &&
            addresses.length > 0 &&
            addresses.map((address, index) => (
              <section
                key={index}
                className="border-2 border-slate-300 flex flex-col justify-between w-72 h-72 rounded-lg p-4"
              >
                <span>
                  <p className="text-md font-bold">{address.name}</p>
                  <p className="text-md">
                    {`${address.streetAddr}, ${address.city}, ${address.dist}`}
                  </p>
                  <p className="text-md">{address.streetAddr}</p>
                  <p>{`${address.dist}, ${address.state}, ${address.zipCode}`}</p>
                  <p>{address.country}</p>
                  <p>{address.phoneNo}</p>
                </span>
                <span className="flex items-center gap-4">
                  <Link className="text-blue-700" to="#">
                    Edit
                  </Link>
                  <p className="border border-slate-800 h-5"></p>
                  <Link className="text-blue-700" to="#">
                    Remove
                  </Link>
                </span>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};
export default AddressPage;
