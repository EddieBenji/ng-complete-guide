import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../ngrx-store/app.reducers';

export interface RecipeFeatureState extends fromApp.AppState {
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

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        // Here we simply are returning a new variable for the recipes
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        // Here we simply are merging (in a new variable), the previous recipes with the new ones.
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      // Fetch the recipe to update:
      const oldRecipe = state.recipes[action.payload.index];
      // Updates the recipe saved in the state, with the updated one:
      const recipeUpdated = {
        ...oldRecipe, ...action.payload.recipe
      };
      // Retrieves all the recipes.
      const recipes = [...state.recipes];
      recipes[action.payload.index] = recipeUpdated;
      return {
        ...state,
        recipes: recipes
      };
    case RecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
