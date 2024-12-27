import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">Our Policy</h2>
        <p className="text-gray-500 mt-2 text-sm">
          We value your satisfaction and provide policies to make your shopping seamless.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-around gap-10 sm:gap-2 text-center text-sm sm:text-base md:text-lg">
        {/* Easy Exchange */}
        <div className="max-w-xs sm:max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all p-5">
          <img
            src={assets.exchange_icon}
            className="w-16 h-16 m-auto mb-5"
            alt="Exchange Icon"
          />
          <h3 className="font-semibold text-gray-800 text-lg">Easy Exchange</h3>
          <p className="text-gray-500 mt-2">
            We offer free exchange within 14 days of purchase.
          </p>
        </div>

        {/* Return Policy */}
        <div className="max-w-xs sm:max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all p-5">
          <img
            src={assets.quality_icon}
            className="w-16 h-16 m-auto mb-5"
            alt="Return Policy Icon"
          />
          <h3 className="font-semibold text-gray-800 text-lg">7 Days Return</h3>
          <p className="text-gray-500 mt-2">
            Enjoy a 7-day free return policy for all purchases.
          </p>
        </div>

        {/* Customer Support */}
        <div className="max-w-xs sm:max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all p-5">
          <img
            src={assets.support_img}
            className="w-16 h-16 m-auto mb-5"
            alt="Customer Support Icon"
          />
          <h3 className="font-semibold text-gray-800 text-lg">Customer Support</h3>
          <p className="text-gray-500 mt-2">
            Our dedicated team is available 24/7 to assist you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
