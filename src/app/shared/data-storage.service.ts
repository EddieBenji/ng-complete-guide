import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
  url = 'https://lalo-ng-recipe-book.firebaseio.com/recipeBook.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storageRecipe() {
    return this.http.put(this.url, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    return this.http.get(this.url).map((response: any) => {
      for (const recipe of response) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return response;
    })
      .subscribe(
        (response) => {
          this.recipeService.setRecipes(<Recipe[]>response);
        }
      );
  }

}
