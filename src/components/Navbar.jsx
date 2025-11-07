import React from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  // TODO: Get cart item count from context
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="app-title">E-Commerce Store</h1>
        <div className="cart-badge" data-testid="cart-badge">
          Cart ({cartItemCount})
        </div>
      </div>
    </nav>
  );
};

export default Navbar;