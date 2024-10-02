import React from 'react';

const VehicleReport = ({ vin, vehicleData, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Vehicle History Report for {vehicleData.make} {vehicleData.model}
            <span className="text-green-600"> {vin}</span>
          </h1>
          <button className="text-blue-600 font-bold px-4 py-2 flex items-center">
            Download Report
          </button>
        </div>

        {/* Card Section */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6 mt-6 flex flex-col sm:flex-row items-center justify-between">
          {/* Image and Logo */}
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/150x200"
              alt="Vehicle"
              className="rounded-lg"
            />
          </div>

          {/* Info Section */}
          <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-800">
              {vehicleData.modelYear !== "N/A" && vehicleData.modelYear} {vehicleData.make !== "N/A" && vehicleData.make} {vehicleData.trim !== "N/A" && vehicleData.trim}
            </h2>
            <ul className="text-left text-sm mt-2 text-gray-600 space-y-1">
              {[
                'Major Accidents',
                'Vehicle Service',
                'Total Loss',
                'Open Recalls',
                'Airbag Deployment',
                'and more',
              ].map((item) => (
                <li key={item} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Button Section */}
          <div className="mt-6 sm:mt-0 text-center">
            <button className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              View Full Report
            </button>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="max-w-5xl mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Country:', value: vehicleData.plantCountry },
            { title: 'Recalls Records:', value: '0 record found' },
            { title: 'Accidents:', value: '0 problem found' },
            { title: 'Auctions:', value: '0 sale found' },
            { title: 'Sales Records:', value: '0 sale found' },
            { title: 'Odometer Check:', value: '4 problem found', blur: true },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-md rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-gray-600 font-bold">{item.title}</h3>
                <p
                  className={`text-blue-600 font-bold ${
                    item.blur ? 'blur-sm text-red-500' : ''
                  }`}
                >
                  {item.value}
                </p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="green"
                  className="w-8 h-8"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0l-6 6a1 1 0 01-1.414 0l-2-2a1 1 0 10-1.414 1.414l2.707 2.707a3 3 0 004.242 0l6-6a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="max-w-5xl mx-auto py-10">
        {/* Vehicle Information Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Vehicle Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
            {[
              { label: 'Make:', value: vehicleData.make },
              { label: 'Model:', value: vehicleData.model },
              { label: 'Model Year:', value: vehicleData.modelYear },
              { label: 'Vehicle Type:', value: vehicleData.vehicleType },
              { label: 'Trim:', value: vehicleData.trim },
              { label: 'Vehicle Descriptor:', value: vehicleData.vehicleDescriptor },
              { label: 'Body Class:', value: vehicleData.bodyClass },
              { label: 'Doors:', value: vehicleData.doors },
              { label: 'Drive Type:', value: vehicleData.driveType },
              { label: 'NCSA Body Type:', value: vehicleData.ncsaBodyType },
              { label: 'NCSA Make:', value: vehicleData.ncsaMake },
              { label: 'NCSA Model:', value: vehicleData.ncsaModel },
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.label}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturer Information Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Manufacturer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
            {[
              { label: 'Manufacturer Name:', value: vehicleData.manufacturerName },
              { label: 'Plant City:', value: vehicleData.plantCity },
              { label: 'Plant Country:', value: vehicleData.plantCountry },
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.label}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engine Information Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Engine Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
            {[
              { label: 'Engine Number of Cylinders:', value: vehicleData.engineNumberCylinders },
              { label: 'Displacement (CC):', value: vehicleData.displacementCC },
              { label: 'Displacement (CI):', value: vehicleData.displacementCI },
              { label: 'Displacement (L):', value: vehicleData.displacementL },
              { label: 'Fuel Type - Primary:', value: vehicleData.fuelTypePrimary },
              { label: 'Engine Brake (hp) From:', value: vehicleData.engineBrakeHP },
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.label}</span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleReport;