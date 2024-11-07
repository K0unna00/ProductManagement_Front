import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  'Added',
  props<{ id: string }>()
);

export const removeFromCart = createAction(
  'Removed',
  props<{ id: string }>()
);