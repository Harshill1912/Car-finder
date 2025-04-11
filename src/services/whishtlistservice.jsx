const WISHLIST_KEY = 'car_finder_wishlist';

export const getWishlistItems = () => {
  const storedItems = localStorage.getItem(WISHLIST_KEY);
  return storedItems ? JSON.parse(storedItems) : [];
};

export const addToWishlist = (carId) => {
  const wishlist = getWishlistItems();
  if (!wishlist.includes(carId)) {
    const updatedWishlist = [...wishlist, carId];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
  }
};

export const removeFromWishlist = (carId) => {
  const wishlist = getWishlistItems();
  const updatedWishlist = wishlist.filter(id => id !== carId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
};

export const isInWishlist = (carId) => {
  const wishlist = getWishlistItems();
  return wishlist.includes(carId);
};

export const getWishlistedCars = (allCars) => {
  const wishlistIds = getWishlistItems();
  return allCars.filter(car => wishlistIds.includes(car.id));
};
