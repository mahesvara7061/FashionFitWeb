import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const AI = () => {
  return (
    <div className="w-full py-10 px-5 sm:px-10">
      {/* Page Title */}
      <div className="text-center mb-10">
        <Title text1="VIRTUAL" text2="FITTING ROOM" />
        <p className="text-gray-500 text-sm sm:text-base mt-3">
          Try on your favorite outfits virtually with AI-powered fitting technology.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Virtual Fitting Area */}
        <div className="bg-gray-100 border rounded-lg shadow-md p-5 relative">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Virtual Fit</h3>
          <div className="h-96 flex items-center justify-center bg-white rounded-lg shadow-inner">
            {/* Placeholder for the avatar or user-uploaded image */}
            <p className="text-gray-400">Upload your photo or customize your avatar.</p>
          </div>
          <button className="absolute top-3 right-5 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition">
            Upload Photo
          </button>
        </div>

        {/* Outfit Selection Panel */}
        <div className="bg-white border rounded-lg shadow-md p-5">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Your Outfit</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Example Product Items */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="border rounded-lg shadow-sm p-3 hover:shadow-md transition cursor-pointer"
              >
                <img
                  src={assets.p_img1} // Replace with dynamic images from your assets
                  alt="Product"
                  className="w-full h-32 object-cover rounded-md"
                />
                <p className="mt-2 text-sm text-gray-600">Product Name</p>
                <p className="text-gray-800 font-medium">$99.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Size Recommendation Section */}
      <div className="mt-10 bg-gray-50 border rounded-lg shadow-md p-5">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Size Recommendation</h3>
        <p className="text-sm text-gray-500">
          Based on your body measurements, we recommend size <span className="font-medium text-gray-700">M</span> for the selected outfit.
        </p>
      </div>

      {/* Footer Section */}
      <div className="mt-10 text-center">
        <button className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-900 transition">
          Try On Now
        </button>
      </div>
    </div>
  );
};

export default AI;
