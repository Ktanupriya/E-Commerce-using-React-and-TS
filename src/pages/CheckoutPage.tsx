import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const initialShippingData: ShippingFormData = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
  phone: ''
};

const initialPaymentData: PaymentFormData = {
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: ''
};

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingFormData>(initialShippingData);
  const [paymentData, setPaymentData] = useState<PaymentFormData>(initialPaymentData);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [billingIsSame, setBillingIsSame] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Pre-fill email if user is logged in
  React.useEffect(() => {
    if (isAuthenticated && user) {
      setShippingData(prev => ({
        ...prev,
        email: user.email,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ')[1] || ''
      }));
    }
  }, [isAuthenticated, user]);

  // Calculate order summary
  const subtotal = totalPrice;
  const shipping = shippingMethod === 'express' ? 12.99 : (subtotal > 50 ? 0 : 5.99);
  const tax = subtotal * 0.07; // 7% tax
  const orderTotal = subtotal + shipping + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const validateShippingForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'phone'];
    
    for (const field of requiredFields) {
      if (!shippingData[field as keyof ShippingFormData]) {
        toast.error(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return false;
      }
    }
    
    // Basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(shippingData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const validatePaymentForm = () => {
    const requiredFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
    
    for (const field of requiredFields) {
      if (!paymentData[field as keyof PaymentFormData]) {
        toast.error(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return false;
      }
    }
    
    // Basic card number validation (16 digits)
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(paymentData.cardNumber.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 16-digit card number');
      return false;
    }
    
    // Basic expiry date validation (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(paymentData.expiryDate)) {
      toast.error('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    
    // Basic CVV validation (3-4 digits)
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(paymentData.cvv)) {
      toast.error('Please enter a valid CVV (3-4 digits)');
      return false;
    }
    
    return true;
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateShippingForm()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePaymentForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate an API call to process the order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Order successful
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      toast.error('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white h-8 w-8 rounded-full flex items-center justify-center">
              1
            </div>
            <span className="ml-2 font-medium text-gray-800">Shipping</span>
          </div>
          <div className="h-1 w-16 md:w-32 bg-gray-300 mx-2 md:mx-4">
            <div className={`h-full bg-blue-600 ${step >= 2 ? 'w-full' : 'w-0'} transition-all duration-300`}></div>
          </div>
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <span className={`ml-2 font-medium ${step >= 2 ? 'text-gray-800' : 'text-gray-500'}`}>Payment</span>
          </div>
          <div className="h-1 w-16 md:w-32 bg-gray-300 mx-2 md:mx-4">
            <div className={`h-full bg-blue-600 ${step >= 3 ? 'w-full' : 'w-0'} transition-all duration-300`}></div>
          </div>
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
            <span className={`ml-2 font-medium ${step >= 3 ? 'text-gray-800' : 'text-gray-500'}`}>Confirmation</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Forms */}
        <div className="lg:w-2/3">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>
              
              <form onSubmit={handleContinueToPayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingData.firstName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingData.lastName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingData.email}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingData.address}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingData.city}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingData.state}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP/Postal Code*
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={shippingData.zipCode}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country*
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={shippingData.country}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingData.phone}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Method</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition-colors">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex-1">
                        <span className="block font-medium text-gray-800">Standard Shipping</span>
                        <span className="block text-sm text-gray-600">
                          {subtotal > 50 ? 'Free' : '₹5.99'} - Delivery in 5-7 business days
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">
                        {subtotal > 50 ? 'Free' : '₹5.99'}
                      </span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition-colors">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex-1">
                        <span className="block font-medium text-gray-800">Express Shipping</span>
                        <span className="block text-sm text-gray-600">
                          ₹12.99 - Delivery in 1-3 business days
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">₹12.99</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Edit Shipping Info
                </button>
              </div>
              
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="border border-gray-300 rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-800">Credit/Debit Card</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-10 h-6 bg-gray-300 rounded"></div>
                      <div className="w-10 h-6 bg-gray-300 rounded"></div>
                      <div className="w-10 h-6 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card*
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date (MM/YY)*
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing Address</h3>
                  
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={billingIsSame}
                        onChange={(e) => setBillingIsSame(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">
                        Same as shipping address
                      </span>
                    </label>
                  </div>
                  
                  {!billingIsSame && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name*
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name*
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address*
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City*
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State/Province*
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP/Postal Code*
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
              {items.map(item => {
                const { product, quantity } = item;
                const price = product.onSale
                  ? product.price * (1 - (product.discount || 0) / 100)
                  : product.price;
                
                return (
                  <div key={product.id} className="flex items-start">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">Qty: {quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      ₹{(price * quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-4 border-t border-gray-200 pt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;