import React from "react";

const TruckCard = ({title}) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 px-6 py-4">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-green-100 rounded-full p-2">
            <span className="text-green-600 font-bold text-xl">8.1</span>
            <span className="text-sm ml-1">out of 10</span>
          </div>
          <div className="text-sm font-medium text-gray-500">edmunds TESTED</div>
        </div>
        <p className="mt-4 text-gray-700">
          {title}
        </p>
        <div className="mt-4">
          <a href="#" className="text-blue-500 hover:underline text-sm">
            Read full review
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center">
            <span className="block text-lg font-semibold">Rank #1</span>
            <span className="text-gray-500 text-sm">6 Large trucks</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-semibold">★★★★☆</span>
            <span className="text-gray-500 text-sm">60 Owner Reviews</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-semibold">21 mpg</span>
            <span className="text-gray-500 text-sm">Combined MPG</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-semibold">$183/mo</span>
            <span className="text-gray-500 text-sm">Cost to Drive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckCard;
