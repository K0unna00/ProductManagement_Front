import { createReducer, on } from '@ngrx/store';
import { addToCart, clearCart, removeFromCart } from '../actions/cart.actions';

export interface CartState {
  count: number;
  items: { id: string; name: string }[];
}

export const initialState: CartState = {
  count: 0,
  items :[]
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { id, name }) => {
    const isItemExists = state.items.some(item => item.id === id);
    
    if (isItemExists) {
      return state;
    }

    return { ...state, items: [...state.items, { id, name }] };
  }),
  on(removeFromCart, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id)
  })),
  
  on(clearCart, (state) => (
    {
      ...state, items : []
    }
  ))
);