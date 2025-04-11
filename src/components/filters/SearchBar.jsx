import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex-grow">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search by brand or model..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
          size={18}
        />
      </div>
    </form>
  );
};

export default SearchBar;
