import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { getProductsByCategory } from '../data/products';
import { Product } from '../types';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    if (category) {
      const categoryProducts = getProductsByCategory(category);
      setProducts(categoryProducts);
    }
  }, [category]);

  const categoryTitle = category ? `${category.charAt(0).toUpperCase()}${category.slice(1)}'s Collection` : '';

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  // Get all available colors and sizes from products
  const availableColors = Array.from(
    new Set(products.flatMap(product => product.colors || []))
  );
  
  const availableSizes = Array.from(
    new Set(products.flatMap(product => product.sizes || []))
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    // Sort logic would be implemented here
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], value]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{categoryTitle}</h1>
        <p className="text-gray-600 mt-2">
          Discover our latest collection of {category} products designed for style and comfort.
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start gap-4">
        <button 
          className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md md:hidden"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </button>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none">
            <select 
              value={sortOption}
              onChange={handleSortChange}
              className="w-full md:w-auto bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
          </div>
          <span className="hidden md:inline text-gray-500">
            {products.length} products
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar - Mobile */}
        {isFiltersOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden overflow-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button 
                onClick={() => setIsFiltersOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            {/* Filter sections */}
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={handleMinPriceChange}
                      min="0"
                      max={priceRange[1]}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={handleMaxPriceChange}
                      min={priceRange[0]}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
              
              {/* Colors */}
              {availableColors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          selectedColors.includes(color) 
                            ? 'border-blue-500' 
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sizes */}
              {availableSizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1 border ${
                          selectedSizes.includes(size) 
                            ? 'border-blue-500 bg-blue-50 text-blue-600' 
                            : 'border-gray-300 hover:border-gray-400'
                        } rounded-md`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Apply Filters Button */}
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
              
              {/* Clear Filters */}
              <button 
                onClick={() => {
                  setSelectedColors([]);
                  setSelectedSizes([]);
                  setPriceRange([0, 300]);
                }}
                className="w-full text-gray-600 py-2 hover:text-blue-600"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Filters Sidebar - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <h2 className="text-xl font-bold">Filters</h2>
            
            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">$</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    min="0"
                    max={priceRange[1]}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">$</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    min={priceRange[0]}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
            
            {/* Colors */}
            {availableColors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        selectedColors.includes(color) 
                          ? 'border-blue-500' 
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Sizes */}
            {availableSizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 border ${
                        selectedSizes.includes(size) 
                          ? 'border-blue-500 bg-blue-50 text-blue-600' 
                          : 'border-gray-300 hover:border-gray-400'
                      } rounded-md`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Clear Filters */}
            <button 
              onClick={() => {
                setSelectedColors([]);
                setSelectedSizes([]);
                setPriceRange([0, 300]);
              }}
              className="text-gray-600 text-sm hover:text-blue-600"
            >
              Clear All Filters
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;