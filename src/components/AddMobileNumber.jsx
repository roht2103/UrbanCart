import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const AddMobileNumber = ({ setEditMobileWindow, email }) => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");

  const updateMobile = (mobile) => {
    try {
      const response = axios.put(
        "http://localhost:1000/account/profile/add-mobile",
        { email: email, mobile: mobile }
      );
    } catch (err) {
      console.log("There was an error while adding mobile number", err);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    alert("Otp sent");
    setStep(2);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    alert("otp verified.");
    updateMobile(mobileNumber);
    setEditMobileWindow(false);
  };

  return (
    <div className="absolute top-60 w-4/12">
      <section className="bg-gray-100 rounded-t-md p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">
          {step === 1 ? "Enter your mobile number" : "Enter the OTP"}
        </h1>
        <RxCross2
          className="text-xl cursor-pointer"
          onClick={() => setEditMobileWindow(false)}
        />
      </section>
      <section className="rounded-b-md p-4 bg-white shadow-xl flex flex-col">
        {step === 1 && (
          <>
            <p>
              This number will be used for your UrbenCart profile. You'll
              receive a text to verify that it's really you when needed. Your
              phone number helps us verify your identity.
            </p>
            <form onSubmit={sendOtp}>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full mt-6 p-1 outline outline-2 outline-offset-2 border-0 rounded-sm"
              />
              <input
                type="submit"
                value="Continue"
                className="mt-3 bg-[#FFBD59] py-1 px-2 rounded-md right-0 cursor-pointer"
              />
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <p>
              We have sent an OTP to your mobile number. Please enter the OTP
              below to verify your mobile number.
            </p>
            <form onSubmit={verifyOtp}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full mt-6 p-1 outline outline-2 outline-offset-2 border-0 rounded-sm"
              />
              <input
                type="submit"
                value="Verify OTP"
                className="mt-3 bg-[#FFBD59] py-1 px-2 rounded-md right-0 cursor-pointer"
              />
            </form>
          </>
        )}
      </section>
    </div>
  );
};

export default AddMobileNumber;
