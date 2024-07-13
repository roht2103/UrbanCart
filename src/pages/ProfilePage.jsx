import Footer from "../components/Footer";
import EditName from "../components/EditName";
import AddMobileNumber from "../components/AddMobileNumber";
import { useAuth0 } from "@auth0/auth0-react";
import Lottie from "lottie-react";
import animation from "../assets/animations/loading.json";
import { MdEdit } from "react-icons/md";
import { useState } from "react";

const ProfilePage = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [editNameWindow, setEditNameWindow] = useState(false);
  const [editMobileWindow, setEditMobileWindow] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-36">
        <Lottie animationData={animation} className="h-28" />
      </div>
    );
  }

  const currentUser =
    props.currentUser && props.currentUser[0] ? props.currentUser[0] : null;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 md:p-4 w-full lg:w-4/6 md:w-5/6 m-3">
        <h1 className="text-2xl md:text-3xl mb-6 font-bold">
          Manage Your Profile
        </h1>
        {isAuthenticated && currentUser && (
          <section className="grid sm:grid-cols-[1fr_5fr]">
            <span className="place-self-center sm:place-self-start p-3">
              <img
                src={currentUser.img}
                alt=""
                className="h-32 min-w-32 w-32 rounded-full"
              />
            </span>
            <section className="flex flex-col w-full">
              <span className="pt-14 p-5 w-full bg-gray-200 rounded-lg mb-5">
                <h2 className="text-2xl flex items-center gap-3 font-bold">
                  {currentUser.name}
                  <MdEdit
                    className="h-5 cursor-pointer font-light"
                    onClick={() => setEditNameWindow(!editNameWindow)}
                  />
                </h2>
                <p>{currentUser.email}</p>
              </span>
              <span className="p-5 w-full border-2 rounded-lg">
                <h2 className="text-xl flex items-center font-bold">
                  Contact Details
                </h2>
                <p>Receive important alerts for your profile here.</p>
                <p className="flex justify-between mt-4 font-bold">
                  Mobile number
                  <MdEdit
                    className="h-5 cursor-pointer font-light"
                    onClick={() => setEditMobileWindow(!editMobileWindow)}
                  />
                </p>
                <p>{!currentUser.mobile ? "Not set" : currentUser.mobile}</p>
              </span>
              <p>The account holder's profile can't be removed.</p>
            </section>
          </section>
        )}
      </div>
      <Footer />
      {editNameWindow && (
        <EditName
          name={currentUser.name}
          email={currentUser.email}
          setEditNameWindow={setEditNameWindow}
        />
      )}
      {editMobileWindow && (
        <AddMobileNumber
          setEditMobileWindow={setEditMobileWindow}
          email={currentUser.email}
        />
      )}
    </div>
  );
};

export default ProfilePage;
