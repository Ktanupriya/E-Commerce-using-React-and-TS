export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'kids' | 'household';
  images: string[];
  featured?: boolean;
  trending?: boolean;
  onSale?: boolean;
  discount?: number;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}