import { configureStore, createSlice } from "@reduxjs/toolkit";

// Paradise Nursery cart slice.
// Reducers required by the rubric: addItem, removeItem, updateQuantity.
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
      const { id, quantity } = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((it) => it.id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, it) => sum + it.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, it) => sum + it.price * it.quantity, 0);

export const store = configureStore({ reducer: { cart: cartSlice.reducer } });

export default cartSlice.reducer;
