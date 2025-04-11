import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NoResults = ({ filters, onResetFilters }) => {
  const hasFilters = Object.keys(filters).length > 0;
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No cars found</h2>
      <p className="text-gray-600 max-w-md mb-6">
        {hasFilters 
          ? "We couldn't find any cars matching your current filters. Try adjusting your search criteria."
          : "We couldn't find any cars. Please check back later."}
      </p>
      {hasFilters && (
        <Button onClick={onResetFilters} className="bg-car-primary hover:bg-car-secondary">
          Reset All Filters
        </Button>
      )}
    </div>
  );
};

export default NoResults;