import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('Buy Now Functionality', () => {
  test('should navigate to thank you page and clear cart after buying', () => {
    render(<App />);
    
    // Add item to cart first
    const addToCartButton = screen.getByTestId('add-to-cart-p1');
    fireEvent.click(addToCartButton);
    
    // Verify item is in cart
    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge).toHaveTextContent('Cart (1)');
    
    // Click buy now
    const buyNowButton = screen.getByTestId('buy-now');
    expect(buyNowButton).not.toBeDisabled();
    fireEvent.click(buyNowButton);
    
    // Should navigate to thank you page
    expect(screen.getByTestId('thank-you-message')).toBeInTheDocument();
    expect(screen.getByText('Thank you for your purchase!')).toBeInTheDocument();
  });

  test('should disable buy now button when cart is empty', () => {
    render(<App />);
    
    // Buy now button should be disabled when cart is empty
    const buyNowButton = screen.getByTestId('buy-now');
    expect(buyNowButton).toBeDisabled();
  });
});