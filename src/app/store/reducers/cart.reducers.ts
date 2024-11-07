import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart } from '../actions/cart.actions';

export interface CartState {
  count: number;
}

export const initialState: CartState = {
  count: 0
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state) => ({ ...state, count: state.count + 1 })),
  on(removeFromCart, (state) => ({ ...state, count: state.count - 1 }))
);