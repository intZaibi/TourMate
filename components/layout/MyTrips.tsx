import React from "react";

const IslamabadCard = () => {
  return (
    <div className="max-w-md mx-6 my-7 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-40">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/52/Faisal_Mosque_in_Islamabad.jpg"
          alt="Islamabad"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Islamabad, Pakistan</h2>
        <p className="text-gray-700 mb-4">
          Islamabad, Pakistan's serene capital, blends adventure, culture, and nature. Margalla Hills, vibrant food scenes, and UNESCO sites await solo travelers.
        </p>
        <div className="mb-4">
          <span className="text-gray-500 text-sm">Tags:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Adventure</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Cultural</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Solo Travel</span>
          </div>
        </div>
        <div className="mb-2">
          <span className="text-gray-500 text-sm">Best Time:</span>{" "}
          <span className="text-black font-semibold">October to April</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500 text-sm">Avg Daily Cost:</span>{" "}
          <span className="text-black font-semibold">$250-$350</span>
        </div>
        <div className="mb-4">
          <span className="text-gray-500 text-sm">Currency:</span>{" "}
          <span className="text-black font-semibold">PKR</span>
        </div>
        <div className="text-gray-400 text-sm flex items-center gap-1">
          <span>🕒 Saved {new Date(Date.now()).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default IslamabadCard;
