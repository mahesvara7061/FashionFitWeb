import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      {/* Title Text */}
      <div className="inline-flex items-center gap-2">
        <p className="text-lg sm:text-2xl text-gray-500">
          {text1}{' '}
          <span className="text-black font-semibold">{text2}</span>
        </p>
      </div>

      {/* Divider Line */}
      <div className="flex items-center justify-center w-full mt-2">
        <div className="h-[2px] w-16 sm:w-24 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

export default Title;
