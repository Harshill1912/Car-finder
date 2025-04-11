
import { cars } from '@/data/mockCars';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCars = async (
  filters = {},
  sort = 'price-low-to-high',
  page = 1,
  limit = 10
) => {
  // Simulate network delay
  await delay(800);

  // Apply filters
  let filteredCars = [...cars];

  if (filters.brand) {
    filteredCars = filteredCars.filter(car => car.brand === filters.brand);
  }

  if (filters.minPrice !== undefined) {
    filteredCars = filteredCars.filter(car => car.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice);
  }

  if (filters.fuelType) {
    filteredCars = filteredCars.filter(car => car.fuelType === filters.fuelType);
  }

  if (filters.seatingCapacity) {
    filteredCars = filteredCars.filter(car => car.seatingCapacity === filters.seatingCapacity);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase().includes(searchLower) || 
      car.model.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  switch (sort) {
    case 'price-low-to-high':
      filteredCars.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-to-low':
      filteredCars.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredCars.sort((a, b) => b.year - a.year);
      break;
    default:
      break;
  }

  // Calculate pagination
  const totalCars = filteredCars.length;
  const totalPages = Math.ceil(totalCars / limit);
  const startIndex = (page - 1) * limit;
  const paginatedCars = filteredCars.slice(startIndex, startIndex + limit);

  return {
    cars: paginatedCars,
    totalCars,
    totalPages,
  };
};

export const fetchCarById = async (id) => {
    // Simulate network delay
    await delay(500);
    
    const car = cars.find(car => car.id === id);
    return car || null;
  };