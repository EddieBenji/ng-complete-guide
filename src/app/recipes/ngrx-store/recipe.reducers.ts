import { Recipe } from '../recipe.model';
import * as AuthActions from '../../auth/ngrx-store/auth.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface RecipeFeatureState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [
    new Recipe('Burger! (local)', 'Nice burger!',
      'https://www.redrobin.com/content/dam/web/menu/tavern-menu/tavern-double-burger-1100.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 12)]),
  ]
};

export function recipeReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGN_UP:
    case AuthActions.SIGN_IN:
      return {
        /*'...state' means like:
        * token: state.token*/
        ...state,
        authenticated: true
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
