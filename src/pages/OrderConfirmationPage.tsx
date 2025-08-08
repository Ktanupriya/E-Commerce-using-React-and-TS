import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Printer, ChevronRight } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
  
  // Mock order details
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-sm font-semibold text-gray-600 uppercase">Order Number</h2>
              <p className="text-lg font-bold text-gray-800">{orderNumber}</p>
            </div>
            <div className="mb-4 md:mb-0">
              <h2 className="text-sm font-semibold text-gray-600 uppercase">Order Date</h2>
              <p className="text-lg font-bold text-gray-800">{orderDate}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-600 uppercase">Estimated Delivery</h2>
              <p className="text-lg font-bold text-gray-800">{estimatedDelivery}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Shipping Address</h3>
                <p className="text-gray-800">John Doe</p>
                <p className="text-gray-800">123 Main Street, Apt 4B</p>
                <p className="text-gray-800">New York, NY 10001</p>
                <p className="text-gray-800">United States</p>
                <p className="text-gray-800">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Shipping Method</h3>
                <p className="text-gray-800">Standard Shipping</p>
                <p className="text-gray-800">Estimated delivery: {estimatedDelivery}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Payment Method</h3>
                <p className="text-gray-800">Credit Card (Visa)</p>
                <p className="text-gray-800">**** **** **** 1234</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Billing Address</h3>
                <p className="text-gray-800">John Doe</p>
                <p className="text-gray-800">123 Main Street, Apt 4B</p>
                <p className="text-gray-800">New York, NY 10001</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">₹179.97</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-800">Free</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-800">₹12.60</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹192.57</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <Printer className="h-5 w-5 mr-2" />
              Print Receipt
            </button>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/orders"
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Order Status
            </Link>
            <Link
              to="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              Continue Shopping
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;