import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import Lottie from "lottie-react";
import animation from "../assets/animations/loading.json";
const ProfilePage = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-36">
        <Lottie animationData={animation} className="h-28" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 md:p-4 w-full lg:w-4/6 rounded-lg md:w-5/6 bg-gray-100 m-3">
        <h1 className="text-2xl md:text-3xl mb-6">Your Profile</h1>
        {isAuthenticated &&
          props.currentUser &&
          props.currentUser.length > 0 && (
            <section className="flex md:flex-cols">
              <span>
                <img
                  src={props.currentUser[0].img}
                  alt=""
                  className="h-32 w-32 rounded-full"
                />
              </span>
              <span className="ml-5">
                <h2 className="text-xl">Name: {props.currentUser[0].name}</h2>
                <p>Email: {props.currentUser[0].email}</p>
                <p>Saved Addresses:</p>
                {props.currentUser[0].addresses.map((addr) => {
                  return <p key={addr}>{addr}</p>;
                })}
              </span>
            </section>
          )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
