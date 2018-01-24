import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService {
  url = 'https://lalo-ng-recipe-book.firebaseio.com/recipeBook.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put(this.url, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).map(response => {
      if (!response) {
        console.log('Nothing in the db!');
        response = [new Recipe('Burger', 'Burger-Angry-Angus',
          'http://proexpansion.com/uploads/article/image/1618/larger_hambur.jpg',
          [new Ingredient('Pan', 2)]
        )];
        return response;
      }
      for (const recipe of response) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return response;
    }).subscribe(
      (response) => {
        this.recipeService.setRecipes(<Recipe[]>response);
      }
    );
  }

}
