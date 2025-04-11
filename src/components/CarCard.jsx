import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isInWishlist, addToWishlist, removeFromWishlist } from '../services/whishtlistservice';
import { useToast } from "../hooks/use-toast";
import { Button } from './ui/button';

const CarCard = ({ car, onWishlistChange }) => {
  const [inWishlist, setInWishlist] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    setInWishlist(isInWishlist(car.id));
  }, [car.id]);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(car.id);
      toast({
        title: "Removed from wishlist",
        description: `${car.brand} ${car.model} has been removed from your wishlist.`,
        variant: "default",
      });
    } else {
      addToWishlist(car.id);
      toast({
        title: "Added to wishlist",
        description: `${car.brand} ${car.model} has been added to your wishlist.`,
        variant: "default",
      });
    }

    setInWishlist(!inWishlist);
    if (onWishlistChange) onWishlistChange();
  };

  return (
    <div className="car-card bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 overflow-hidden flex flex-col h-full animate-fade-in transition-colors">
      <div className="relative">
        <img
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleWishlistToggle}
          className="wishlist-icon absolute top-3 right-3 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={20}
            className={cn(
              "transition-colors duration-300",
              inWishlist ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-300"
            )}
          />
        </button>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-car-dark dark:text-white">{car.brand} {car.model}</h3>
          <span className="bg-car-light dark:bg-gray-600 px-2 py-1 rounded text-xs font-medium text-car-primary dark:text-white">
            {car.year}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <span className="font-medium">Price:</span> ${car.price.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <span className="font-medium">Fuel:</span> {car.fuelType}
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <span className="font-medium">Seats:</span> {car.seatingCapacity}
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <span className="font-medium">{car.fuelType === 'Electric' ? 'Range:' : 'MPG:'}</span>
            {car.fuelType === 'Electric' ? '250 mi' : `${car.mileage} mpg`}
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {car.description}
        </p>

        <Link to={`/car/${car.id}`} className="mt-auto">
          <Button className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
