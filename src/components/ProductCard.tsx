import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  // Calculate discounted price if the product is on sale
  const discountedPrice = product.onSale
    ? product.price * (1 - (product.discount || 0) / 100)
    : null;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Sale badge */}
      {product.onSale && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {product.discount}% OFF
        </div>
      )}
      
      {/* Product image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[3/4]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              title="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
              title="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
      
      {/* Product info */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 truncate">
          <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        
        <div className="mt-1 flex items-center">
          {/* Rating stars */}
          {product.rating && (
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-500">
                ({product.reviews})
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-2 flex items-center">
          {discountedPrice ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                ₹{discountedPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-sm font-medium text-gray-500 line-through">
                ₹{product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Available colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-3 flex items-center space-x-1">
            {product.colors.map(color => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;