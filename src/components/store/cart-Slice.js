import { createSlice } from "@reduxjs/toolkit";

const cartState = {
  items: [],
  totalItems: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    replaceCart(state, action) {
      state.totalItems = action.payload.totalItems;
      state.items = action.payload.items;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id); // This is how to check if a certain item item already exists.
      state.totalItems++; // This adds and item to the cart by updating the state.
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload; //This ID is the payload!!!
      const existingItem = state.items.find((item) => item.id === id);
      state.totalItems--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
