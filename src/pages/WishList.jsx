import React, { useState, useEffect } from 'react';
import { cars as allCars } from '../data/mockCars';
import { getWishlistedCars } from '../services/whishtlistservice';
import CarCard from '../components/CarCard';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';

const Wishlist = () => {
  const [wishlistedCars, setWishlistedCars] = useState([]);
  const [refreshWishlist, setRefreshWishlist] = useState(false);

  useEffect(() => {
    const cars = getWishlistedCars(allCars);
    setWishlistedCars(cars);
  }, [refreshWishlist]);

  const handleWishlistChange = () => {
    setRefreshWishlist(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back to search</span>
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Wishlist</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your saved cars and find your dream vehicle.
          </p>
        </div>
        
        {wishlistedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedCars.map((car) => (
              <CarCard 
                key={car.id} 
                car={car} 
                onWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
              <Heart className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
              Start saving your favorite cars by clicking the heart icon on car listings.
            </p>
            <Link 
              to="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Browse Cars
            </Link>
          </div>
        )}
      </main>
      
      <footer className="bg-blue-600 dark:bg-blue-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 Dream Cars - Find Your Perfect Vehicle</p>
          <p className="text-sm text-gray-300 dark:text-gray-400">
            Created with ReactJS & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Wishlist;
