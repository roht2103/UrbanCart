import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Company Information</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <Link to="/account" className="hover:underline">
                Your Account
              </Link>
            </li>
            <li>
              <Link to="/account/profile" className="hover:underline">
                Your Profile
              </Link>
            </li>
            <li>
              <Link to="/account/wishlist" className="hover:underline">
                Your Wishist
              </Link>
            </li>
            <li>
              <Link to="/account/orders" className="hover:underline">
                Orders
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Policies</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
          <ul className="flex space-x-4">
            <li>
              <a href="https://www.facebook.com/profile.php?id=100049567549768">
                <FaFacebook className="text-2xl hover:text-gray-400" />
              </a>
            </li>
            <li>
              <a href="https://x.com/RohitTh53744122">
                <FaTwitter className="text-2xl hover:text-gray-400" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/rxhit_27/">
                <FaInstagram className="text-2xl hover:text-gray-400" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/rohit-thorat-502566246/">
                <FaLinkedin className="text-2xl hover:text-gray-400" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 text-center">
        <p>&copy; 2024 UrbanCart. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
