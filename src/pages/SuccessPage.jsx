import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">
            Order Placed Successfully!
          </h1>
          <p className="mt-4 text-gray-600">
            Thank you for your purchase. Your order has been placed
            successfully, and you'll receive a confirmation email shortly.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-3 text-white bg-[#FFBD59] hover:bg-blue-700 rounded-lg"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
