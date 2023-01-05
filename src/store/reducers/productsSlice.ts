import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "models";

interface ProductsState {
  products: IProduct[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
