import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/ngrx-store/shopping-list.reducers';
import * as fromAuth from '../auth/ngrx-store/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.IngredientsState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
