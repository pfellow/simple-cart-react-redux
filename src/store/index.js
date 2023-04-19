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
      const currentItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (currentItemIndex === -1) {
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: action.payload.quantity,
          total: action.payload.price * action.payload.quantity,
        });
      } else {
        state.items[currentItemIndex].quantity += action.payload.quantity;
        state.items[currentItemIndex].total =
          state.items[currentItemIndex].quantity * action.payload.price;
      }
      state.quantity += action.payload.quantity;
    },
    increase(state, action) {
      const currentItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[currentItemIndex].quantity += action.payload.quantity;
      state.items[currentItemIndex].total =
        state.items[currentItemIndex].quantity *
        state.items[currentItemIndex].price;
      state.quantity += action.payload.quantity;
      if (state.items[currentItemIndex].quantity === 0) {
        state.items = state.items.filter(
          (item) => item.id !== state.items[currentItemIndex].id
        );
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
