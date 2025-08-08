import { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: 'Men\'s Casual Shirt',
    description: 'A comfortable and stylish casual shirt for men, perfect for any occasion.',
    price: 3499,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true,
    trending: true,
    colors: ['blue', 'white', 'black'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: 127
  },
  {
    id: '2',
    name: 'Women\'s Summer Dress',
    description: 'A light and elegant dress for the summer, suitable for both casual and semi-formal occasions.',
    price: 4199,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true,
    trending: true,
    onSale: true,
    discount: 20,
    colors: ['red', 'blue', 'pink'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.7,
    reviews: 89
  },
  {
    id: '3',
    name: 'Kid\'s Colorful T-Shirt',
    description: 'A vibrant and comfortable t-shirt for kids, made from 100% cotton.',
    price: 1799,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: false,
    trending: true,
    colors: ['green', 'yellow', 'blue'],
    sizes: ['3-4Y', '5-6Y', '7-8Y'],
    rating: 4.8,
    reviews: 42
  },
  {
    id: '4',
    name: 'Modern Coffee Table',
    description: 'A stylish and modern coffee table that adds elegance to any living room.',
    price: 10999,
    category: 'household',
    images: [
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true,
    trending: false,
    colors: ['brown', 'black', 'white'],
    rating: 4.6,
    reviews: 35
  },
  {
    id: '5',
    name: 'Men\'s Classic Watch',
    description: 'A timeless classic watch for men with genuine leather strap.',
    price: 8999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    trending: true,
    colors: ['brown', 'black'],
    rating: 4.9,
    reviews: 76
  },
  {
    id: '6',
    name: 'Women\'s Casual Jeans',
    description: 'Comfortable and stylish jeans for everyday wear.',
    price: 4999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    trending: true,
    sizes: ['26', '28', '30', '32'],
    rating: 4.4,
    reviews: 112
  },
  {
    id: '7',
    name: 'Kids\' Sneakers',
    description: 'Colorful and comfortable sneakers for active kids.',
    price: 2999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    onSale: true,
    discount: 15,
    colors: ['red', 'blue', 'green'],
    sizes: ['EU28', 'EU30', 'EU32', 'EU34'],
    rating: 4.7,
    reviews: 58
  },
  {
    id: '8',
    name: 'Smart LED Lamp',
    description: 'Control the ambiance of your room with this smart LED lamp. Compatible with voice assistants.',
    price: 4499,
    category: 'household',
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true,
    trending: true,
    colors: ['white', 'black'],
    rating: 4.6,
    reviews: 94
  },
  {
    id: '9',
    name: 'Men\'s Formal Suit',
    description: 'Premium quality formal suit for men. Perfect for business meetings and special occasions.',
    price: 19999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true,
    colors: ['navy', 'black', 'grey'],
    sizes: ['48', '50', '52', '54'],
    rating: 4.9,
    reviews: 48
  },
  {
    id: '10',
    name: 'Women\'s Elegant Heels',
    description: 'Elegant high heels for women, perfect for formal events and parties.',
    price: 6999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    trending: true,
    colors: ['black', 'red', 'nude'],
    sizes: ['36', '37', '38', '39', '40'],
    rating: 4.5,
    reviews: 67
  },
  {
    id: '11',
    name: 'Kids\' Winter Jacket',
    description: 'Warm and cozy winter jacket for kids with water-resistant fabric.',
    price: 5999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/2959588/pexels-photo-2959588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2959588/pexels-photo-2959588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true,
    colors: ['blue', 'pink', 'yellow'],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    rating: 4.8,
    reviews: 53
  },
  {
    id: '12',
    name: 'Kitchen Mixer',
    description: 'High-quality kitchen mixer with multiple attachments for various cooking needs.',
    price: 14999,
    category: 'household',
    images: [
      'https://images.pexels.com/photos/5765/flour-jar-baking-powder.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5765/flour-jar-baking-powder.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    onSale: true,
    discount: 10,
    colors: ['red', 'black', 'silver'],
    rating: 4.7,
    reviews: 128
  },
  // New Products
  {
    id: '13',
    name: 'Men\'s Running Shoes',
    description: 'Lightweight and comfortable running shoes with superior cushioning.',
    price: 5999,
    category: 'men',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    trending: true,
    colors: ['black', 'grey', 'blue'],
    sizes: ['40', '41', '42', '43', '44'],
    rating: 4.6,
    reviews: 89
  },
  {
    id: '14',
    name: 'Women\'s Designer Handbag',
    description: 'Elegant designer handbag made from premium leather.',
    price: 12999,
    category: 'women',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true,
    colors: ['brown', 'black', 'tan'],
    rating: 4.8,
    reviews: 45
  },
  {
    id: '15',
    name: 'Kids\' Party Dress',
    description: 'Beautiful party dress for special occasions.',
    price: 3999,
    category: 'kids',
    images: [
      'https://images.pexels.com/photos/5560019/pexels-photo-5560019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5560019/pexels-photo-5560019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    trending: true,
    colors: ['pink', 'purple', 'white'],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    rating: 4.9,
    reviews: 32
  },
  {
    id: '16',
    name: 'Smart Air Purifier',
    description: 'Advanced air purifier with HEPA filter and air quality monitoring.',
    price: 15999,
    category: 'household',
    images: [
      'https://images.pexels.com/photos/4429561/pexels-photo-4429561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4429561/pexels-photo-4429561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true,
    colors: ['white', 'silver'],
    rating: 4.7,
    reviews: 56
  }
];

export const getProducts = () => products;

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getTrendingProducts = () => {
  return products.filter(product => product.trending);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};