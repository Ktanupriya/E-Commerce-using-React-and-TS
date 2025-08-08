import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import toast from 'react-hot-toast';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (
    product: Product, 
    quantity: number = 1, 
    selectedColor?: string, 
    selectedSize?: string
  ) => {
    setItems(prevItems => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id &&
               item.selectedColor === selectedColor &&
               item.selectedSize === selectedSize
      );

      if (existingItemIndex !== -1) {
        // Update the quantity of the existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success('Item quantity updated in cart');
        return updatedItems;
      } else {
        // Add the new item to the cart
        toast.success('Item added to cart');
        return [...prevItems, { product, quantity, selectedColor, selectedSize }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
    toast.success('Cart updated');
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => {
      const price = item.product.onSale 
        ? item.product.price * (1 - (item.product.discount || 0) / 100) 
        : item.product.price;
      return total + price * item.quantity;
    },
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};