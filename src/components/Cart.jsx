import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  
  // TODO: Get cart state and functions from context
  const cart = []; // Replace with actual cart from context
  const cartSubtotal = 0; // Calculate from cart items

  const handleIncrement = (productId) => {
    // TODO: Implement increment functionality
    console.log('Increment cart item:', productId);
  };

  const handleDecrement = (productId) => {
    // TODO: Implement decrement functionality
    console.log('Decrement cart item:', productId);
  };

  const handleRemove = (productId) => {
    // TODO: Implement remove functionality
    console.log('Remove cart item:', productId);
  };

  const handleBuyNow = () => {
    // TODO: Clear cart and navigate to thank you page
    console.log('Buy now clicked');
    navigate('/thank-you');
  };

  const isEmpty = cart.length === 0;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      
      {isEmpty && (
        <p className="empty-cart">Your cart is empty</p>
      )}
      
      {!isEmpty && (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <h4>{item.title}</h4>
                <p>${(item.price / 100).toFixed(2)} each</p>
              </div>
              
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    data-testid={`dec-cart-${item.id}`}
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    data-testid={`inc-cart-${item.id}`}
                    onClick={() => handleIncrement(item.id)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                
                <button
                  className="remove-btn"
                  data-testid={`remove-cart-${item.id}`}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
                
                <div className="line-total">
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="cart-summary">
        {!isEmpty && (
          <div className="cart-subtotal" data-testid="cart-subtotal">
            Subtotal: ${(cartSubtotal / 100).toFixed(2)}
          </div>
        )}
        
        <button
          className="buy-now-btn"
          data-testid="buy-now"
          onClick={handleBuyNow}
          disabled={isEmpty}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;