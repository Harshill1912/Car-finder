import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import PriceRangeSlider from './PriceRangeSlider';
import { brands, fuelTypes, seatingCapacities, minPrice, maxPrice } from '@/data/mockCars';

const FilterPanel = ({
  isFilterVisible,
  localFilters,
  priceRange,
  setPriceRange,
  hasActiveFilters,
  handleFilterChange,
  handleResetFilters,
  handleApplyFilters,
  loading
}) => {
  return (
    <div className={`filter-transition ${isFilterVisible ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} md:max-h-none md:opacity-100 md:overflow-visible`}>
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm dark:shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-car-dark dark:text-white">Filters</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
          >
            <X size={16} className="mr-1" /> Reset
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="space-y-2">
            <Label htmlFor="brand" className="dark:text-gray-200">Brand</Label>
            <Select
              value={localFilters.brand || "all-brands"}
              onValueChange={(value) => handleFilterChange('brand', value === "all-brands" ? undefined : value)}
            >
              <SelectTrigger id="brand" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md z-50">
                <SelectItem value="all-brands">All Brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fuel Type */}
          <div className="space-y-2">
            <Label htmlFor="fuelType" className="dark:text-gray-200">Fuel Type</Label>
            <Select
              value={localFilters.fuelType || "all-fuel-types"}
              onValueChange={(value) => handleFilterChange('fuelType', value === "all-fuel-types" ? undefined : value)}
            >
              <SelectTrigger id="fuelType" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <SelectValue placeholder="All Fuel Types" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md z-50">
                <SelectItem value="all-fuel-types">All Fuel Types</SelectItem>
                {fuelTypes.map(fuel => (
                  <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seating Capacity */}
          <div className="space-y-2">
            <Label htmlFor="seatingCapacity" className="dark:text-gray-200">Seating Capacity</Label>
            <Select
              value={localFilters.seatingCapacity?.toString() || "any-capacity"}
              onValueChange={(value) => handleFilterChange('seatingCapacity', value === "any-capacity" ? undefined : Number(value))}
            >
              <SelectTrigger id="seatingCapacity" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <SelectValue placeholder="Any Capacity" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md z-50">
                <SelectItem value="any-capacity">Any Capacity</SelectItem>
                {seatingCapacities.map(seats => (
                  <SelectItem key={seats} value={seats.toString()}>{seats} seats</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <PriceRangeSlider 
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleApplyFilters}
            disabled={loading}
            className="bg-car-primary hover:bg-car-secondary text-white"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
