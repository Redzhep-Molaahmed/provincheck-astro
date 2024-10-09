import React from 'react';

const VehicleReportVINCARIO = ({ vin, vehicleData, error }) => {
    if (error) {
        return <div>Error: {error}</div>;
    }



    return (

        <div className="max-w-5xl mx-auto py-10">
            {/* Header Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-700">
                        Vehicle History Report for {vehicleData["Make"]} {vehicleData["Model"]}
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
                            src={`/src/assets/optimized/${vehicleData["Make"].toLowerCase()}.png`}
                            alt="Vehicle"
                            height={200}
                            width={200}
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
                                    className={`text-blue-600 font-bold ${item.blur ? 'blur-sm text-red-500' : ''
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


            <div className="max-w-5xl mx-auto py-10">
                {/* Vehicle Identification Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Vehicle Identification</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "VIN", value: vehicleData.VIN },
                            { label: "Vehicle ID", value: vehicleData["Vehicle ID"] },
                            { label: "Check Digit", value: vehicleData["Check Digit"] },
                            { label: "Sequential Number", value: vehicleData["Sequential Number"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* General Vehicle Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">General Vehicle Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "Make", value: vehicleData["Make"] },
                            { label: "Model", value: vehicleData["Model"] },
                            { label: "Model Year", value: vehicleData["Model Year"] },
                            { label: "Product Type", value: vehicleData["Product Type"] },
                            { label: "Body", value: vehicleData["Body"] },
                            { label: "Trim", value: vehicleData["Trim"] },
                            { label: "Series", value: vehicleData["Series"] },
                            { label: "Drive", value: vehicleData["Drive"] },
                            { label: "Number of Doors", value: vehicleData["Number of Doors"] },
                            { label: "Number of Seat Rows", value: vehicleData["Number of Seat Rows"] },
                            { label: "Number of Seats", value: vehicleData["Number of Seats"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Engine and Transmission Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Engine and Transmission</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "Engine Displacement (ccm)", value: vehicleData["Engine Displacement (ccm)"] },
                            { label: "Fuel Type - Primary", value: vehicleData["Fuel Type - Primary"] },
                            { label: "Transmission", value: vehicleData["Transmission"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Manufacturer Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Manufacturer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "Manufacturer", value: vehicleData["Manufacturer"] },
                            { label: "Manufacturer Address", value: vehicleData["Manufacturer Address"] },
                            { label: "Plant Company", value: vehicleData["Plant Company"] },
                            { label: "Plant City", value: vehicleData["Plant City"] },
                            { label: "Plant State", value: vehicleData["Plant State"] },
                            { label: "Plant Country", value: vehicleData["Plant Country"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Performance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            {
                                label: "Fuel Consumption Extra Urban (l/100km)",
                                value: vehicleData["Fuel Consumption Extra Urban (l/100km)"],
                            },
                            {
                                label: "Fuel Consumption Urban (l/100km)",
                                value: vehicleData["Fuel Consumption Urban (l/100km)"],
                            },
                            { label: "Drag Coefficient", value: vehicleData["Drag Coefficient"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dimensions Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Dimensions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "Wheelbase (mm)", value: vehicleData["Wheelbase (mm)"] },
                            { label: "Height (mm)", value: vehicleData["Height (mm)"] },
                            { label: "Length (mm)", value: vehicleData["Length (mm)"] },
                            { label: "Width (mm)", value: vehicleData["Width (mm)"] },
                            { label: "Ride Height (mm)", value: vehicleData["Ride Height (mm)"] },
                            { label: "Track Front (mm)", value: vehicleData["Track Front (mm)"] },
                            { label: "Track Rear (mm)", value: vehicleData["Track Rear (mm)"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Suspension and Steering Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Suspension and Steering</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "Front Suspension", value: vehicleData["Front Suspension"] },
                            { label: "Rear Suspension", value: vehicleData["Rear Suspension"] },
                            { label: "Steering", value: vehicleData["Steering"] },
                            { label: "Steering Type", value: vehicleData["Steering Type"] },
                            { label: "Power Steering", value: vehicleData["Power Steering"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Brakes Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Brakes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "Front Brakes", value: vehicleData["Front Brakes"] },
                            { label: "Rear Brakes", value: vehicleData["Rear Brakes"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wheels and Tires Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Wheels and Tires</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "Wheel Rims Size", value: vehicleData["Wheel Rims Size"] },
                            { label: "Wheel Size", value: vehicleData["Wheel Size"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Angles Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Angles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "Approach Angle (°)", value: vehicleData["Approach Angle (°)"] },
                            { label: "Ramp Angle (°)", value: vehicleData["Ramp Angle (°)"] },
                            { label: "Departure Angle (°)", value: vehicleData["Departure Angle (°)"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Capacities Section */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Capacities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "Maximum Trunk Capacity (l)", value: vehicleData["Maximum Trunk Capacity (l)"] },
                            { label: "Minimum Trunk Capacity (l)", value: vehicleData["Minimum Trunk Capacity (l)"] },
                            { label: "Weight Empty (kg)", value: vehicleData["Weight Empty (kg)"] },
                            { label: "Max Weight (kg)", value: vehicleData["Max Weight (kg)"] },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Safety Features Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Safety Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            { label: "ABS", value: vehicleData["ABS"] ? "Yes" : "No" },
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}:</span>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleReportVINCARIO;