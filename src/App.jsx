import React, { useState } from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import "./App.css";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find((it) => it.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((it) => it.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((it) => it.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((it) => it.id !== action.payload.id);
        }
      }
    },
    clearCart: (state) => { state.items = []; },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (s) => s.cart.items;
export const selectCartCount = (s) => s.cart.items.reduce((a, b) => a + b.quantity, 0);
export const selectCartTotal = (s) => s.cart.items.reduce((a, b) => a + b.price * b.quantity, 0);

const store = configureStore({ reducer: { cart: cartSlice.reducer } });

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <Provider store={store}>
      <div className="app-shell">
        <div className="landing-hero" style={{ display: showProductList || showCart ? "none" : "flex" }}>
          <div>
            <h1>Welcome to Paradise Nursery</h1>
            <p className="tagline">Bring nature home, one plant at a time.</p>
            <button
              type="button"
              className="btn-get-started"
              onClick={() => setShowProductList(true)}
            >
              Get Started
            </button>
          </div>
        </div>
        {showProductList && (
          <section>
            <h2>Our Houseplants</h2>
            <p>Browse our collection of houseplants grouped by category.</p>
            <button type="button" onClick={() => setShowCart(true)}>View Cart</button>
          </section>
        )}
      </div>
    </Provider>
  );
}

export default App;
export { store, setShowProductList: () => setShowProductList };
