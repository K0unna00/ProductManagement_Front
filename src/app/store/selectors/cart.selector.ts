import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "../reducers/cart.reducers";

export const selectCartFeature = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartFeature,
  (state: CartState) => state.items
);

export const selectCartCount = createSelector(
  selectCartItems,
  (items) => items.length
);