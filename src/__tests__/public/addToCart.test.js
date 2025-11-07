import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import App from '../../App';

const renderApp = () => {
  return render(
    <App />
  );
};

describe('Add to Cart Functionality', () => {
  test('should add item to cart and update cart badge', () => {
    renderApp();
    
    // Initially cart should be empty
    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge).toHaveTextContent('Cart (0)');
    
    // Add first product to cart
    const addToCartButton = screen.getByTestId('add-to-cart-p1');
    fireEvent.click(addToCartButton);
    
    // Cart badge should show 1 item
    expect(cartBadge).toHaveTextContent('Cart (1)');
    
    // Add second product to cart
    const addToCartButton2 = screen.getByTestId('add-to-cart-p2');
    fireEvent.click(addToCartButton2);
    
    // Cart badge should show 2 items
    expect(cartBadge).toHaveTextContent('Cart (2)');
  });

  test('should show quantity controls after adding to cart', () => {
    renderApp();
    
    // Add product to cart
    const addToCartButton = screen.getByTestId('add-to-cart-p1');
    fireEvent.click(addToCartButton);
    
    // Quantity controls should appear
    expect(screen.getByTestId('inc-catalog-p1')).toBeInTheDocument();
    expect(screen.getByTestId('dec-catalog-p1')).toBeInTheDocument();
    
    // Add to cart button should disappear
    expect(screen.queryByTestId('add-to-cart-p1')).not.toBeInTheDocument();
  });
});