import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCarById } from '../services/carService';
import { isInWishlist, addToWishlist, removeFromWishlist } from '../services/whishtlistservice';
import { ChevronLeft, Heart, Info, Users, Fuel, ArrowRight } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import { useIsMobile } from '../hooks/use-mobile';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/Navbar';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadCar = async () => {
      try {
        setLoading(true);
        setError(null);

        const carData = await fetchCarById(Number(id));

        if (carData) {
          setCar(carData);
          setInWishlist(isInWishlist(carData.id));
        } else {
          setError('Car not found');
        }
      } catch (err) {
        console.error('Failed to fetch car details:', err);
        setError('Failed to load car details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id]);

  const handleWishlistToggle = () => {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 mb-6">
          <ChevronLeft size={20} />
          <span>Back to search</span>
        </Link>

        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <Skeleton className="h-72 w-full" />
            <div className="p-6">
              <Skeleton className="h-8 w-1/3 mb-4" />
              <Skeleton className="h-6 w-1/4 mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-12 w-1/3" />
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-600 text-red-700 dark:text-red-100 px-4 py-3 rounded mb-6">
            {error}
          </div>
        ) : car && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-fade-in">
            <div className="relative">
              <img
                src={car.imageUrl}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-72 object-cover"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={20}
                  className={cn(
                    "transition-colors duration-200",
                    inWishlist ? "fill-car-accent text-car-accent" : "text-gray-500 dark:text-gray-300"
                  )}
                />
              </Button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <Badge className="mb-2 bg-indigo-500">{car.year}</Badge>
                <h1 className="text-3xl font-bold text-white">{car.brand} {car.model}</h1>
                <p className="text-xl text-white">${car.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: <Fuel />, label: "Fuel Type", value: car.fuelType },
                  { icon: <ArrowRight />, label: "Transmission", value: car.transmission },
                  { icon: <Users />, label: "Seating", value: `${car.seatingCapacity} seats` },
                  {
                    icon: <Info />,
                    label: car.fuelType === 'Electric' ? 'Range' : 'Mileage',
                    value: car.fuelType === 'Electric' ? '250 mi' : `${car.mileage} mpg`
                  },
                ].map(({ icon, label, value }, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="mx-auto mb-2 text-blue-600 dark:text-blue-400">{React.cloneElement(icon, { size: 24 })}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
                    <p className="font-medium text-gray-800 dark:text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About this {car.brand} {car.model}</h2>
                <p className="text-gray-600 dark:text-gray-300">{car.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-800 text-white">
                  Request a Test Drive
                </Button>
                <Button variant="outline" className="dark:border-gray-500 dark:text-white dark:hover:bg-gray-700">
                  Contact Dealer
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 Dream Cars - Find Your Perfect Vehicle</p>
          <p className="text-sm text-gray-300">Created with ReactJS & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default CarDetails;
