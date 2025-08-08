import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Share2, Truck, RefreshCw, Star, Shield } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import ProductGrid from '../components/ProductGrid';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addItem } = useCart();

  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      setProduct(fetchedProduct);
      
      if (fetchedProduct) {
        setSelectedImage(fetchedProduct.images[0]);
        
        // Set default color and size if available
        if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
          setSelectedColor(fetchedProduct.colors[0]);
        }
        
        if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }
        
        // Get related products
        const related = getProductsByCategory(fetchedProduct.category)
          .filter(p => p.id !== fetchedProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        <p className="mt-4 text-gray-600">The product you are looking for might be unavailable or does not exist.</p>
        <Link to="/" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity, selectedColor, selectedSize);
    }
  };

  const discountedPrice = product.onSale
    ? product.price * (1 - (product.discount || 0) / 100)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 text-sm text-gray-500 breadcrumbs">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${product.category}`} className="hover:text-blue-600">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === image ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Ratings */}
          {product.rating && (
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="mb-6">
            {discountedPrice ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="ml-3 text-lg font-medium text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
                  {product.discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Short Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-sm text-blue-600 hover:text-blue-500">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border ${
                      selectedSize === size 
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
          
          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-xl"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-xl"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            
            <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          {/* Shipping and Returns */}
          <div className="space-y-3 border-t border-gray-200 pt-6">
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                <p className="text-sm text-gray-500">Free standard shipping on orders over $50</p>
              </div>
            </div>
            <div className="flex items-start">
              <RefreshCw className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
                <p className="text-sm text-gray-500">Return within 30 days for a full refund</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Secure Payment</h4>
                <p className="text-sm text-gray-500">Your payment information is processed securely</p>
              </div>
            </div>
          </div>
          
          {/* Share */}
          <div className="mt-8 flex items-center">
            <span className="text-gray-600 mr-3">Share:</span>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({product.reviews || 0})
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          )}
          
          {activeTab === 'details' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Details</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Material: Premium Quality</li>
                <li>Origin: Imported</li>
                <li>Care Instructions: Machine wash cold, tumble dry low</li>
                <li>Model is wearing size M</li>
                <li>SKU: {product.id}</li>
              </ul>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Write a Review
                </button>
              </div>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">John Doe</span>
                    <span className="ml-auto text-sm text-gray-500">3 months ago</span>
                  </div>
                  <h4 className="text-base font-semibold mb-2">Great product, highly recommend!</h4>
                  <p className="text-gray-700">
                    This product exceeded my expectations. The quality is excellent and it looks even better in person.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                      {[...Array(1)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">Jane Smith</span>
                    <span className="ml-auto text-sm text-gray-500">1 month ago</span>
                  </div>
                  <h4 className="text-base font-semibold mb-2">Good quality, fast shipping</h4>
                  <p className="text-gray-700">
                    The product arrived quickly and was well packaged. The quality is good for the price.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetailPage;