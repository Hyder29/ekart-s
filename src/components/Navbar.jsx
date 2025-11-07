import React from 'react';

const Navbar = () => {
  // TODO: Get cart item count from context
  const cartItemCount = 0;

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