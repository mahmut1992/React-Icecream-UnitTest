import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      // sepette aynı üründen ve aynı varyantdan var mı
      const found = state.cart.find(
        (item) =>
          item.id == payload.item.id && item.type === payload.selectedType
      );

      if (found) {
        found.amount++;
      } else {
        state.cart.push({
          ...payload.item,
          type: payload.selectedType,
          amount: 1,
        });
      }
    },
    deleteFromCart: (state, { payload }) => {
      // sepette ki ürünü bul
      const index = state.cart.findIndex(
        (item) => item.id == payload.item.id && item.type === payload.item.type
      );
      if (state.cart[index].amount > 1) {
        state.cart[index].amount--;
      } else {
        state.cart.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;
