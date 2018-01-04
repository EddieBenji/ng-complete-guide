import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(1, 'A Test Recipe',
      'This is a description', 'https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg'),
    new Recipe(2, 'A Second Test Recipe',
      'This is a second description', 'https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg')
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor() {
  }

  getRecipes() {
    // Return a new array which is a exact copy of the recipes array.
    return this.recipes.slice();
  }

}
