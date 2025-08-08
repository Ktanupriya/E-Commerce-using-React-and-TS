import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopStyle</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for all your shopping needs. We provide quality products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="text-xl font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/men" className="text-gray-400 hover:text-white transition-colors">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="text-gray-400 hover:text-white transition-colors">
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/kids" className="text-gray-400 hover:text-white transition-colors">
                  Kids' Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/household" className="text-gray-400 hover:text-white transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-400 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-400 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">
                  123 Fashion Street, Dundigal, Hyderabad 500043
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-400" />
                <a href="tel:+919701352096" className="text-gray-400 hover:text-white transition-colors">
                  +91 9701352096
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                <a href="mailto:info@shopstyle.com" className="text-gray-400 hover:text-white transition-colors">
                  info@shopstyle.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 focus:outline-none flex-1 text-gray-900 rounded-l-md"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} ShopStyle. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;