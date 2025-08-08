import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { getTrendingProducts, getFeaturedProducts } from '../data/products';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const trendingProducts = getTrendingProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {/* Trending Products Section */}
        <ProductGrid products={trendingProducts} title="Trending Now" />
        
        {/* Categories Banner */}
        <section className="my-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryCard 
              title="Men's Fashion" 
              image="https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              link="/category/men" 
            />
            <CategoryCard 
              title="Women's Fashion" 
              image="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              link="/category/women" 
            />
            <CategoryCard 
              title="Kids' Fashion" 
              image="https://images.pexels.com/photos/3771605/pexels-photo-3771605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              link="/category/kids" 
            />
            <CategoryCard 
              title="Home & Living" 
              image="https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              link="/category/household" 
            />
          </div>
        </section>
        
        {/* Featured Products Section */}
        <ProductGrid products={featuredProducts} title="Featured Products" />
        
        {/* Promotional Banner */}
        <section className="my-16">
          <div className="bg-blue-600 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0">
              <img 
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Promotional background"
                className="w-full h-full object-cover mix-blend-overlay opacity-30"
              />
            </div>
            <div className="relative py-16 px-8 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-8 md:mb-0 md:max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Summer Sale Up To 50% Off</h2>
                <p className="text-white/90 text-lg mb-8">
                  Get ready for summer with our exclusive collection. Limited time offer on selected items.
                </p>
                <Link 
                  to="/sale" 
                  className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300"
                >
                  Shop Now
                </Link>
              </div>
              <div className="flex-shrink-0 w-40 h-40 md:w-60 md:h-60 rounded-full bg-white/20 flex items-center justify-center animate-pulse-slow">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/30 flex items-center justify-center">
                  <div className="text-white text-center">
                    <span className="block text-3xl md:text-5xl font-bold">50%</span>
                    <span className="block text-xl md:text-2xl font-medium">OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="my-16 bg-gray-100 rounded-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Stay updated with the latest trends, new arrivals, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, link }) => {
  return (
    <Link to={link} className="group block relative rounded-lg overflow-hidden h-64">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="inline-block mt-2 text-white/90 group-hover:text-white transition-colors">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HomePage;