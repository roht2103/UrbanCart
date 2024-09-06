// src/CancelPage.jsx

import React from "react";

const CancelPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">Order Cancelled</h1>
          <p className="mt-4 text-gray-600">
            We're sorry, but your order was not completed. If you have any
            questions or need assistance, please contact our support team.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
