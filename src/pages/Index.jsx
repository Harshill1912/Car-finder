import React, { useState, useEffect } from 'react';
import { fetchCars } from '../services/carService';
import CarCard from '../components/CarCard';
import CarFilter from '../components/CarFilter';
import Pagination from '../components/Pagination';
import NoResults from '../components/NoResult';
import Navbar from '../components/Navbar';
import { Skeleton } from '../components/ui/skeleton';

const Index = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('price-low-to-high');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshWishlist, setRefreshWishlist] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchCars(filters, sort, currentPage, 10);
        
        setCars(response.cars);
        setTotalPages(response.totalPages);
        
        if (currentPage > response.totalPages) {
          setCurrentPage(1);
        }
      } catch (err) {
        console.error('Failed to fetch cars:', err);
        setError('Failed to load cars. Please try again later.');
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [filters, sort, currentPage, refreshWishlist]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistChange = () => {
    setRefreshWishlist(prev => !prev);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-car-dark dark:text-white mb-2">Find Your Dream Car</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Browse our collection of premium vehicles and find the perfect match for your lifestyle.
          </p>
        </div>
        
        <CarFilter 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          loading={loading}
          currentFilters={filters}
          currentSort={sort}
        />
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : cars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onWishlistChange={handleWishlistChange}
                />
              ))}
            </div>
            
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        ) : (
          <NoResults filters={filters} onResetFilters={handleResetFilters} />
        )}
      </main>
      
      <footer className="bg-car-primary text-white py-6 mt-12 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 Dream Cars - Find Your Perfect Vehicle</p>
          <p className="text-sm text-gray-300">Created with ReactJS & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
