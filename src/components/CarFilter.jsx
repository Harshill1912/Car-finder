import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SlidersHorizontal } from 'lucide-react';
import { minPrice, maxPrice } from '@/data/mockCars';
import SearchBar from './filters/SearchBar';
import FilterPanel from './filters/FilterPanel';

const CarFilter = ({ 
  onFilterChange, 
  onSortChange, 
  loading, 
  currentFilters, 
  currentSort 
}) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [localFilters, setLocalFilters] = useState(currentFilters);
  const [priceRange, setPriceRange] = useState([
    currentFilters.minPrice || minPrice,
    currentFilters.maxPrice || maxPrice
  ]);
  const [searchQuery, setSearchQuery] = useState(currentFilters.search || '');

  useEffect(() => {
    setLocalFilters(currentFilters);
    setPriceRange([
      currentFilters.minPrice || minPrice,
      currentFilters.maxPrice || maxPrice
    ]);
    setSearchQuery(currentFilters.search || '');
  }, [currentFilters]);

  const handleFilterChange = (name, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetFilters = () => {
    setLocalFilters({});
    setPriceRange([minPrice, maxPrice]);
    setSearchQuery('');
    onFilterChange({});
  };

  const handleApplyFilters = () => {
    onFilterChange({
      ...localFilters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      search: searchQuery
    });
    if (window.innerWidth < 768) {
      setIsFilterVisible(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const hasActiveFilters = Object.keys(currentFilters).length > 0;

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-4">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSubmit={handleSearch}
        />
        
        <div className="flex gap-3">
          <Button
            type="button"
            variant={isFilterVisible ? "default" : "outline"}
            className="md:hidden flex items-center gap-2"
            onClick={toggleFilterVisibility}
          >
            <SlidersHorizontal size={16} />
            Filters
          </Button>
          
          <Select
            value={currentSort}
            onValueChange={(value) => onSortChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <FilterPanel
        isFilterVisible={isFilterVisible}
        localFilters={localFilters}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        hasActiveFilters={hasActiveFilters}
        handleFilterChange={handleFilterChange}
        handleResetFilters={handleResetFilters}
        handleApplyFilters={handleApplyFilters}
        loading={loading}
      />
    </div>
  );
};

export default CarFilter;
