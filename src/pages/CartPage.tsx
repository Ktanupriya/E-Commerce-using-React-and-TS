import React from 'react';
import { Link } from 'react-router-dom';
import { Trash, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-20 w-20 mx-auto text-gray-400 mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Calculate subtotal, shipping, and tax
  const subtotal = totalPrice;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const orderTotal = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      <p className="text-gray-600 mb-8">
        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {items.map(item => {
                const { product, quantity, selectedColor, selectedSize } = item;
                const price = product.onSale
                  ? product.price * (1 - (product.discount || 0) / 100)
                  : product.price;
                const itemTotal = price * quantity;
                
                return (
                  <div key={`${product.id}-${selectedColor}-${selectedSize}`} className="p-4 md:py-6 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                    {/* Mobile: Product */}
                    <div className="md:hidden flex mb-4">
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <h3 className="text-base font-medium text-gray-800">
                            <Link to={`/product/${product.id}`} className="hover:text-blue-600">
                              {product.name}
                            </Link>
                          </h3>
                          <div className="mt-1 flex text-sm">
                            {selectedColor && (
                              <div className="flex items-center">
                                <div
                                  className="h-4 w-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: selectedColor }}
                                />
                                <span className="ml-1 text-gray-500">{selectedColor}</span>
                              </div>
                            )}
                            {selectedSize && (
                              <span className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                Size: {selectedSize}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            ₹{price.toFixed(2)} x {quantity}
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop: Product */}
                    <div className="hidden md:block md:col-span-6">
                      <div className="flex items-center">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-800">
                            <Link to={`/product/${product.id}`} className="hover:text-blue-600">
                              {product.name}
                            </Link>
                          </h3>
                          <div className="mt-1 flex text-sm">
                            {selectedColor && (
                              <div className="flex items-center">
                                <div
                                  className="h-4 w-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: selectedColor }}
                                />
                                <span className="ml-1 text-gray-500">{selectedColor}</span>
                              </div>
                            )}
                            {selectedSize && (
                              <span className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                Size: {selectedSize}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-500"
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop: Price */}
                    <div className="hidden md:block md:col-span-2 text-center text-sm text-gray-600">
                      ₹{price.toFixed(2)}
                    </div>
                    
                    {/* Quantity */}
                    <div className="mt-4 md:mt-0 md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          className="px-3 py-1 text-gray-600 hover:text-gray-800"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center">
                          {quantity}
                        </span>
                        <button
                          className="px-3 py-1 text-gray-600 hover:text-gray-800"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Desktop: Total */}
                    <div className="hidden md:block md:col-span-2 text-right text-sm font-medium text-gray-900">
                      ₹{itemTotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-6">
            <Link
              to="/"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-800">
                  {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-800">₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{orderTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                to="/checkout"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>Secure Checkout</p>
              </div>
            </div>
            
            {/* Accepted Payment Methods */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 mb-3">We Accept:</p>
              <div className="flex justify-between">
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Help Section */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-base font-medium text-gray-800 mb-4">Need Help?</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shipping-policy" className="text-blue-600 hover:text-blue-800">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-blue-600 hover:text-blue-800">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-600 hover:text-blue-800">
                  Contact Customer Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;