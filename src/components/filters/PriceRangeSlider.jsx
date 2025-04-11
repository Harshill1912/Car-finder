import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const PriceRangeSlider = ({ priceRange, setPriceRange, minPrice, maxPrice }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-gray-800 dark:text-gray-200">Price Range</Label>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
        </span>
      </div>
      <Slider
        defaultValue={[minPrice, maxPrice]}
        min={minPrice}
        max={maxPrice}
        step={1000}
        value={priceRange}
        onValueChange={(value) => setPriceRange(value)}
        className="mt-6 bg-gray-400 dark:bg-gray-600"
      />
    </div>
  );
};

export default PriceRangeSlider;
