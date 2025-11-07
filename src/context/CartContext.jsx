/** * @llm-instructions
 * - Comment all logical blocks with `// ****`
 * - Wrap all console logs in `*** ... ***`
 * - Do not modify file structure
 */


import React, { createContext, useContext, useState } from 'react';
import productsData from '../data/products.json';

const CartContext = createContext();

export const useCart = () => {
  // ****
  const context = useContext(CartContext);
  // ****
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  // ****
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ****
  // Helper function to find product details (including stock) from the main data
  // This ensures we always have the latest stock information
  // ****
  const getProductById = (productId) => {
    return productsData.find(p => p.id === productId);
  };

  // ****
  // - addToCart(product, quantity = 1)
  // ****
  const addToCart = (product, quantity = 1) => {
    // ****
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      // ****
      if (existingItem) {
        // Item already in cart, update its quantity
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        // Item not in cart, add it
        // Ensure we add all product info + quantity
        const newQuantity = Math.min(quantity, product.stock);
        return [...prevCart, { ...product, quantity: newQuantity }];
      }
    });
  };

  // ****
  // - updateQuantity(productId, quantity)
  // ****
  const updateQuantity = (productId, quantity) => {
    // ****
    setCart(prevCart => {
      // ****
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return prevCart.filter(item => item.id !== productId);
      }
      
      // ****
      const product = getProductById(productId);
      if (!product) return prevCart; // Safety check
      
      // ****
      // Adjust quantity to not exceed stock
      const newQuantity = Math.min(quantity, product.stock);

      // ****
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // ****
  // - removeFromCart(productId)
  // ****
  const removeFromCart = (productId) => {
    // ****
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // ****
  // - clearCart()
  // ****
  const clearCart = () => {
    // ****
    setCart([]);
  };

  // ****
  // - getCartItemCount()
  // ****
  const getCartItemCount = () => {
    // ****
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // ****
  // - getCartSubtotal()
  // ****
  const getCartSubtotal = () => {
    // ****
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // ****
  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartItemCount,
    getCartSubtotal,
  };
  // ****

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};