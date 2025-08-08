import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/5868272/pexels-photo-5868272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Summer Collection <span className="text-blue-400">2025</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Discover the latest trends and styles for this season. Shop our new arrivals and refresh your wardrobe with exclusive pieces.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/new-arrivals"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Shop New Arrivals
            </Link>
            <Link
              to="/category/women"
              className="inline-block bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Women's Collection
            </Link>
          </div>
        </div>
      </div>
      
      {/* Animated pattern overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-x-40 -inset-y-32 opacity-10">
          <div className="w-[100rem] h-[100rem] rounded-full border-[3rem] border-white/20 animate-spin-slow"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;