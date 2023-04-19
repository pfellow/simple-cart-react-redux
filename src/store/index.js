import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialCartState = {
  isCartDisplayed: false,
  items: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const currentItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!currentItem) {
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: action.payload.quantity,
          total: action.payload.price * action.payload.quantity,
        });
      } else {
        currentItem.quantity += action.payload.quantity;
        currentItem.total = currentItem.quantity * action.payload.price;
      }
      state.quantity += action.payload.quantity;
    },
    increase(state, action) {
      const currentItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      currentItem.quantity += action.payload.quantity;
      currentItem.total = currentItem.quantity * currentItem.price;
      state.quantity += action.payload.quantity;
      if (currentItem.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== currentItem.id);
      }
    },
    toggleCart(state) {
      state.isCartDisplayed = !state.isCartDisplayed;
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export const cartActions = cartSlice.actions;

export default store;
