import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItem,
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../redux/CartSlice";
import { plants } from "../data/plants";

function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  // Calculate total cart amount
  const totalCartAmount = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  // Calculate total cost for each plant in the cart
  const calculateTotalCost = (item) => item.price * item.quantity;

  // Calculate total number of items
  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    window.alert("Coming Soon — checkout will be available in the next release.");
  };

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">
          <button type="button" className="btn-continue">Continue Shopping</button>
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>
      <p className="cart-summary">
        Total Items: {totalItems} · Total Cart Amount: ${totalCartAmount.toFixed(2)}
      </p>
      <div className="cart-rows">
        {items.map((item) => {
          const totalCost = calculateTotalCost(item);
          return (
            <div key={item.id} className="cart-row">
              <img src={item.thumbnail} alt={item.name} className="cart-thumb" />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="cart-unit">Unit Price: ${item.price.toFixed(2)}</p>
                <p className="cart-line-total">
                  Total Cost: ${totalCost.toFixed(2)}
                </p>
              </div>
              <div className="cart-quantity">
                <button type="button" onClick={() => handleDecrement(item)} aria-label="decrease">-</button>
                <span className="cart-qty-value">{item.quantity}</span>
                <button type="button" onClick={() => handleIncrement(item)} aria-label="increase">+</button>
              </div>
              <button
                type="button"
                className="cart-remove"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className="cart-grand-total" data-testid="cart-total">
        Grand Total: ${totalCartAmount.toFixed(2)}
      </div>
      <div className="cart-actions">
        <button type="button" className="btn-checkout" onClick={handleCheckout}>
          Checkout
        </button>
        <Link to="/products">
          <button type="button" className="btn-continue">
            Continue Shopping
          </button>
        </Link>
        <button type="button" className="btn-clear" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </main>
  );
}

export default CartItem;
